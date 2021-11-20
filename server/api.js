const axios = require('axios');
const FormData = require('form-data');
require('dotenv').config();

const API_KEY = process.env.API_KEY;
const UPLOADCARE_KEY = process.env.UPLOADCARE_KEY;
const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp';

const apiCall = function(endpoint, params, callback) {
  axios.get(`${url}${endpoint}`, {
    headers: { 'Authorization': API_KEY },
    params: params,
  })
    .then((response) => callback(null, response.data))
    .catch((err) => callback(err, null));
};

const apiWrap = function(method, endpoint, params, body, callback) {
  axios({
    method: method,
    url: url + endpoint,
    headers: { 'Authorization': API_KEY },
    params: params,
    data: body,
  })
    .then((response) => {
      callback(null, response);
    })
    .catch((err) => callback(err, null));
};

const defaultParams = { responseType: 'json' };

const getProductList = (page, count, callback) => {
  apiCall('/products', {
    page,
    count,
    responseType: 'json',
  },
  callback);
};

const getProductInfo = (productId, callback) => {
  apiCall(`/products/${productId}`, defaultParams, callback);
};

const getProductStyles = (productId, callback) => {
  apiCall(`/products/${productId}/styles`, defaultParams, callback);
};

const getReviews = (productId, page, count, sort, callback) => {
  apiCall('/reviews',
    {
      // eslint-disable-next-line camelcase
      product_id: productId,
      page,
      count,
      sort,
      responseType: 'json',
    },
    callback);
};

const getReviewMeta = (productId, callback) => {
  apiCall('/reviews/meta',
    {
      // eslint-disable-next-line camelcase
      product_id: productId,
      responseType: 'json',
    },
    callback);
};

// function for adding review
const addReview = (data, callback) => {
  axios({
    method: 'post',
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews',
    headers: { 'Authorization': API_KEY },
    params: null,
    data: data,
  })
    .then(({data: response}) => {
      callback(null, response);
    })
    .catch((err) => {
      callback(err, null);
    });
};

// POST & REQUEST FOR Q&A
const report = (endpoint, id) => {
  return new Promise((resolve, reject) => {
    axios.request({
      method: 'put',
      url: `/qa/${endpoint}/${id}/report`,
      headers: { 'Authorization': API_KEY },
      baseURL: url
    })
      .then(resolve())
      .catch((err) => reject(err));
  });
};
const markHelpful = (endpoint, id) => {
  return new Promise((resolve, reject) => {
    axios.request({
      method: 'put',
      url: `/qa/${endpoint}/${id}/helpful`,
      headers: { 'Authorization': API_KEY },
      baseURL: url
    })
      .then(resolve())
      .catch((err)=> reject(err));
  });
};
const addQuestion = (data) => {
  return new Promise((resolve, reject) => {
    axios.request({
      method: 'post',
      url: '/qa/questions',
      headers: { 'Authorization': API_KEY },
      baseURL: url,
      data: data,
    })
      .then(resolve())
      .catch((err) => reject(err));
  });
};
const addAnswer = (questionId, data) => {
  return new Promise((resolve, reject) => {
    axios.request({
      method: 'post',
      url: `/qa/questions/${questionId}/answers`,
      headers: { 'Authorization': API_KEY },
      baseURL: url,
      data: data,
    })
      .then(resolve())
      .catch((err) => reject(err));
  });
};
const uploadImage = (file) => {
  const form = new FormData();
  form.append('UPLOADCARE_PUB_KEY', UPLOADCARE_KEY);
  form.append('UPLOADCARE_STORE', 'auto');
  form.append('file', file.buffer, file.originalname);

  return new Promise((resolve, reject) => {
    axios.request({
      url: 'https://upload.uploadcare.com/base/',
      method: 'post',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${form._boundary}`
      },
      data: form
    })
      .then(result => resolve(result))
      .catch(error => reject(error));
  });
};
// const getQuestions = (productId, page, count, callback) => {
//   apiCall('/qa/questions', {
//     // eslint-disable-next-line camelcase
//     product_id: productId,
//     page: page,
//     count: count
//   },
//   callback);
// };

// const getAnswers = (questionId, page, count, callback) => {
//   apiCall(`/qa/questions/${questionId}/answers`,
//     {
//       page: page,
//       count: count
//     },
//     callback);
// };


module.exports = {
  apiCall,
  apiWrap,
  getProductList,
  getProductInfo,
  getProductStyles,
  getReviews,
  getReviewMeta,
  addReview,
  // getQuestions,
  // getAnswers,
  addQuestion,
  addAnswer,
  markHelpful,
  report,
  uploadImage
};