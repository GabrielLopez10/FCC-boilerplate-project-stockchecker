'use strict';

module.exports = function (app) {
  const axios = require('axios');
  const { anonymizeIP } = require('./utils');
  const mongoose = require('mongoose');

  const Like = mongoose.model('Like', {
    stock: String,
    ip: String,
  });

  async function fetchStockPrice(stockSymbol) {
    try {
      const response = await axios.get(
        `https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${stockSymbol}/quote`
      );
      return response.data.latestPrice;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async function getStockLikes(stockSymbol) {
    try {
      const likes = await Like.countDocuments({ stock: stockSymbol });
      return likes;
    } catch (error) {
      console.error(error);
      return 0;
    }
  }


  app.route('/api/stock-prices').get(async function (req, res) {
    const { stock, like } = req.query;
    const ipAddress = req.anonymizedIP; // Use the anonymized IP address

    try {
      if (Array.isArray(stock)) {
        const stockData = await Promise.all(
          stock.map(async (stockSymbol) => {
            const price = await fetchStockPrice(stockSymbol);
            const likes = await getStockLikes(stockSymbol);
            return { stock: stockSymbol, price, likes };
          })
        );

        if (stockData.length === 2) {
          const [stock1, stock2] = stockData;
          stock1.rel_likes = stock1.likes - stock2.likes;
          stock2.rel_likes = -stock1.rel_likes;
        }

        res.json({ stockData });
      } else {
        const price = await fetchStockPrice(stock);
        let likesCount = await getStockLikes(stock);

        // Check if the 'like' parameter is 'true' and the IP hasn't liked this stock yet
        if (like === 'true') {
          const existingLike = await Like.findOne({ stock, ip: ipAddress });
          if (!existingLike) {
            // If the IP hasn't liked this stock, save the like to the database
            const hashedIp = anonymizeIP(ipAddress);
            const newLike = new Like({ stock, ip: hashedIp });
            await newLike.save();
            likesCount += 1; // Increment the likes count
          }
        }

        res.json({ stockData: { stock, price, likes: likesCount } });
      }
    } catch (error) {
      console.error('Error processing request:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
};
