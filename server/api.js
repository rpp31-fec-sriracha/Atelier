const axios = require('axios');
const API_KEY = require('./config.js');
const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp';

const apiCall = function(endpoint, params, callback) {
  axios.get(`${url}${endpoint}`, {
    headers: { 'Authorization': API_KEY },
    params: params,
  })
    .then((response) => callback(null, response.data))
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

const getReviews = (productId, page, count, callback) => {
  apiCall('/reviews',
    {
      // eslint-disable-next-line camelcase
      product_id: productId,
      page,
      count,
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

// function for marking review as helpful

const getQuestions = (productId, page, count, callback) => {
  apiCall('qa/questions',
    {
      // eslint-disable-next-line camelcase
      product_id: productId,
      page,
      count,
      responseType: 'json',
    },
    callback);
};

const getAnswers = (questionId, page, count, callback) => {
  apiCall(`qa/questions/${questionId}/answers`,
    {
      page,
      count
    },
    callback);
};

// need to add POST functions for QA


module.exports = {
  getProductList,
  getProductInfo,
  getProductStyles,
  getReviews,
  getReviewMeta,
  getQuestions,
  getAnswers,
};