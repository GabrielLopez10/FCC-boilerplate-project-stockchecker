const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  test('Viewing one stock: GET request to /api/stock-prices/', function (done) {
    chai
      .request(server)
      .get('/api/stock-prices')
      .query({ stock: 'GOOG' }) // Replace with the stock symbol you want to test
      .end(function (err, res) {
        assert.equal(res.status, 200);
        done();
      });
  });

  test('Viewing one stock and liking it: GET request to /api/stock-prices/', function (done) {
    chai
      .request(server)
      .get('/api/stock-prices')
      .query({ stock: 'MSFT', like: true }) // Replace with the stock symbol you want to test
      .end(function (err, res) {
        assert.equal(res.status, 200);
        done();
      });
  });

  test('Viewing the same stock and liking it again: GET request to /api/stock-prices/', function (done) {
    chai
      .request(server)
      .get('/api/stock-prices')
      .query({ stock: 'GO0G', like: true }) // Replace with the stock symbol you want to test
      .end(function (err, res) {
        assert.equal(res.status, 200);
        done();
      });
  });

  test('Viewing two stocks: GET request to /api/stock-prices/', function (done) {
    chai
      .request(server)
      .get('/api/stock-prices')
      .query({ stock: ['GOOG', 'MSFT'] }) // Replace with the stock symbols you want to test
      .end(function (err, res) {
        assert.equal(res.status, 200);
        done();
      });
  });

  test('Viewing two stocks and liking them: GET request to /api/stock-prices/', function (done) {
    chai
      .request(server)
      .get('/api/stock-prices')
      .query({ stock: ['GOOG', 'MSFT'], like: true }) // Replace with the stock symbols you want to test
      .end(function (err, res) {
        assert.equal(res.status, 200);
        done();
      });
  });
});
