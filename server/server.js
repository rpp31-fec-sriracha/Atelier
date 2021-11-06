const express = require('express');
const app = express();
const path = require('path');
const api = require('./api.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../client/dist')));

app.all('/api/*', (req, res, next) => {
  console.log('ALL --->', req.method, req.url);
  let method = req.method;
  let reqUrl = (req.url.replace(/^\/api/, ''));
  reqUrl = reqUrl.replace(/\?.*$/, '');
  let params = req.query;
  let data = req.body;
  // method, endpoint, params, body, callback
  api.apiWrap(method, reqUrl, params, data, (err, data) => {
    if (err) {
      res.status(err.status).json(err);
    } else {
      res.status(data.status).json(data.data);
    }
  });
});

app.get('/api/*', (req, res) => {
  let reqUrl = (req.url.replace(/^\/api/, ''));
  reqUrl = reqUrl.replace(/\?.*$/, '');
  let params = req.query;

  api.apiCall(reqUrl, params, (err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(data);
    }
  });
});

app.post('/api/*', (req, res) => {
  let reqUrl = (req.url.replace(/^\/api/, ''));
  reqUrl = reqUrl.replace(/\?.*$/, '');
  let params = req.query;
  let data = req.body;

  api.apiPost(reqUrl, params, data, (err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(201).json(data);
    }
  });
});

app.get('/products', (req, res) => {
  let page = 1;
  let count = 5;
  if (req.query.page) {
    page = page;
  }
  if (req.body.count) {
    count = count;
  }

  api.getProductList(page, count, (err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(data);
    }
  });
});

app.get('/productInfo', (req, res) => {
  console.log(req.url);
  console.log(req.query);
  let productId = req.query.productId;

  api.getProductInfo(productId, (err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(data);
    }
  });
});

app.get('/productStyles', (req, res) => {
  let productId = req.query.productId;

  api.getProductStyles(productId, (err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(data);
    }
  });
});

app.get('/reviews', (req, res) => {
  let productId = req.query.productId;
  let page = 1;
  let count = 5;
  let sortType = req.query.sortType;

  if (req.query.page) {
    page = page;
  }
  if (req.query.count) {
    count = count;
  }

  api.getReviews(productId, page, count, sortType, (err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(data);
    }
  });
});

app.get('/reviews/meta', (req, res) => {
  let productId = req.query.productId;

  api.getReviewMeta(productId, (err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(data);
    }
  });
});

app.get('/questions', (req, res) => {
  let productId = req.query.productId;
  let page = 1;
  let count = 5;
  if (req.query.page) {
    page = page;
  }
  if (req.query.count) {
    count = count;
  }

  api.getQuestions(productId, page, count, (err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(data);
    }
  });
});

app.get('/answers', (req, res) => {
  let productId = req.query.productId;
  let page = 1;
  let count = 5;
  if (req.body.page) {
    page = page;
  }
  if (req.body.count) {
    count = count;
  }

  api.getAnswers(productId, page, count, (err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(data);
    }
  });
});

app.listen(3000, () => console.log('Running server on http://localhost:3000'));