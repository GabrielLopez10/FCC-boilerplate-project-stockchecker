document.getElementById('testForm2').addEventListener('submit', e => {
  e.preventDefault();
  const stockSymbol = e.target[0].value;
  const checkbox = e.target[1].checked;

  // Construct the API URL with regular single quotes
  const apiUrl = `/api/stock-prices/?stock=${stockSymbol}&like=${checkbox}`;

  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      // Structure the response data as you want it
      const stockData = {
        stock: data.stockData.stock,
        price: data.stockData.price,
        likes: data.stockData.likes,
      };
      
      // Convert the structured data to JSON string
      const jsonString = JSON.stringify({ stockData });
      
      // Update the DOM with the JSON string
      document.getElementById('jsonResult').innerText = jsonString;
    });
});

document.getElementById('testForm').addEventListener('submit', e => {
  e.preventDefault();
  const stock1 = e.target[0].value;
  const stock2 = e.target[1].value;
  const checkbox = e.target[2].checked;

  // Construct the API URL with regular single quotes
  const apiUrl = `/api/stock-prices?stock=${stock1}&stock=${stock2}&like=${checkbox}`;

  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      // Structure the response data as you want it
      const stockData = {
        stock1: data.stockData[0].stock,
        price1: data.stockData[0].price,
        rel_likes1: data.stockData[0].rel_likes,
        stock2: data.stockData[1].stock,
        price2: data.stockData[1].price,
        rel_likes2: data.stockData[1].rel_likes,
      };
      
      // Convert the structured data to JSON string
      const jsonString = JSON.stringify({ stockData });
      
      // Update the DOM with the JSON string
      document.getElementById('jsonResult').innerText = jsonString;
    });
});

