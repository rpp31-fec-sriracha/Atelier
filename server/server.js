const express = require('express');
const app = express();
const path = require('path');
const api = require('./api.js');
const multer = require('multer');
const upload = multer();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../client/dist')));
app.use(/^\/\d+/, express.static(path.resolve(__dirname, '../client/dist')));

// app.use((req, res, next) => {
//   console.log(req.method, req.url);
//   next();
// });

app.all('/api/*', (req, res, next) => {
  // console.log('hitting local server', req);
  let method = req.method;
  let reqUrl = (req.url.replace(/^\/api/, ''));
  reqUrl = reqUrl.replace(/\?.*$/, '');
  let params = req.query;
  let data = req.body;

  // method, endpoint, params, body, callback
  api.apiWrap(method, reqUrl, params, data, (err, data) => {
    if (err) {
      console.log(err);
      res.status(err.response.status).json(err);
    } else {
      res.status(data.status).json(data.data);
    }
  });
});

// app.get('/products', (req, res) => {
//   let page = 1;
//   let count = 15;
//   if (req.query.page) {
//     page = page;
//   }
//   if (req.body.count) {
//     count = count;
//   }

//   api.getProductList(page, count, (err, data) => {
//     if (err) {
//       res.status(500).json(err);
//     } else {
//       res.status(200).json(data);
//     }
//   });
// });

// app.get('/productInfo', (req, res) => {
//   // console.log(req.url);
//   // console.log(req.query);
//   let productId = req.query.productId;

//   api.getProductInfo(productId, (err, data) => {
//     if (err) {
//       res.status(500).json(err);
//     } else {
//       res.status(200).json(data);
//     }
//   });
// });

// app.get('/productStyles', (req, res) => {
//   let productId = req.query.productId;

//   api.getProductStyles(productId, (err, data) => {
//     if (err) {
//       res.status(500).json(err);
//     } else {
//       res.status(200).json(data);
//     }
//   });
// });

app.get('/reviews', (req, res) => {
  let productId = req.query.productId;
  let page = 1;
  let count = 30;
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

app.post('/addReview', (req, res) => {
  console.log(req.body);
  // let testObj = {
  //   product_id: 59557,
  //   rating: 5,
  //   summary: 'Best product everrr',
  //   body: 'I really love how this product makes me feel when I wear it.',
  //   recommend: true,
  //   name: 'LeviLive',
  //   email: 'Levispants@pants.com',
  //   characteristics: { '199858': 5, '199859': 5, '199860': 4, '199861': 5 }
  // };

  // api.addReview(testObj, (err, data) => {
  api.addReview(req.body, (err, data) => {
    if (err) {
      console.log('Error: ', err);
      res.status(500).json(err);
    } else {
      // res.status(200).send(data);
      console.log('success');
      res.status(200).json(data);
    }
  });
});

// POST & REQUEST Handler for Q&A
app.put('/helpful', (req, res) => {
  const { endpoint, id } = req.query;

  api.markHelpful(endpoint, id)
    .then(res.status(204).json())
    .catch(err => res.status(500).json(err));
});

app.put('/report', (req, res) => {
  const { endpoint, id } = req.query;

  api.report(endpoint, id)
    .then(res.status(204).json())
    .catch(err => res.status(500).json(err));
});

app.post('/addQueston', (req, res) => {
  api.addQuestion(req.body)
    .then(res.status(201).json())
    .catch(err => res.status(500).json(err));
});

app.post('/addAnswer', (req, res) => {
  const { id } = req.body;
  const { body, name, email, photos } = req.body;

  api.addAnswer(id, { body, name, email, photos })
    .then(res.status(201).json())
    .catch(err => res.status(500).json(err));
});

app.post('/upload', upload.single('photos'), (req, res, next) => {
  console.log(req.file);
  console.log(req.body);
  // console.log(req.body);
  // api.uploadImage(req.file)
  //   .then(res.status(200).json())
  //   .catch(err => res.status(500).json(err));
});

// app.get('/questions', (req, res) => {
//   let productId = req.query.productId;
//   let page = 1;
//   let count = 5;
//   if (req.query.page) {
//     page = page;
//   }
//   if (req.query.count) {
//     count = count;
//   }

//   api.getQuestions(productId, page, count, (err, data) => {
//     if (err) {
//       res.status(500).json(err);
//     } else {
//       res.status(200).json(data);
//     }
//   });
// });

// app.get('/answers', (req, res) => {
//   let productId = req.query.productId;
//   let page = 1;
//   let count = 5;
//   if (req.body.page) {
//     page = page;
//   }
//   if (req.body.count) {
//     count = count;
//   }

//   api.getAnswers(productId, page, count, (err, data) => {
//     if (err) {
//       res.status(500).json(err);
//     } else {
//       res.status(200).json(data);
//     }
//   });
// });

// app.get(/\/\d+\/?/, (req, res) => {
//   res.sendFile('index.html');
// });

app.listen(3000, () => console.log('Running server on http://localhost:3000'));