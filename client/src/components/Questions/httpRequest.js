import axios from 'axios';

const fetchQuestion = (currentProductId) => {
  return new Promise((resolve, reject) => {
    axios
      .request({
        url: '/questions',
        method: 'get',
        baseURL: 'http://localhost:3000',
        params: {
          productId: currentProductId
        }
      })
      .then((q) => resolve(q.data.results))
      .catch((error) => reject(error));
  });
};

export default fetchQuestion;