const axios = require('axios');
const API_KEY = require('./config.js');
const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp';

const apiCall = function(endpoint, params, callback) {
  axios.get(`${url}${endpoint}`, {
    headers: { 'Authorization': API_KEY },
    params: params,
  })
    .then((response) => callback(null, response))
    .catch((err) => callback(err, null));
};

const defaultParams = { responseType: 'json' };

const productList = (page, count, callback) => {
  apiCall('/products', {
    page,
    count,
    responseType: 'json',
  },
  callback);
};

const productInfo = (productId, callback) => {
  apiCall(`/products/${productId}`, defaultParams, callback);
};

const productStyles = (productId, callback) => {
  apiCall(`/products/${productId}/styles`, defaultParams, callback);
};

const getReviews = (productId, page, count, callback) => {
  apiCall(`/reviews`,
    {
      product_id: productId,
      page,
      count,
      responseType: 'json',
    },
    callback);
};




// productList(1, 5, (err, data) => console.log(data));