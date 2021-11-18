import axios from 'axios';

const httpRequest = {
  getQuestion: (currentProductId) => {
    return new Promise((resolve, reject) => {
      axios
        .request({
          url: 'api/qa/questions',
          method: 'get',
          params: {
            product_id: currentProductId,
            count: 20
          }
        })
        .then(q => resolve(q.data.results))
        .catch(error => reject(error));
    });
  },
  getAnswers: (questionId) => {
    return new Promise((resolve, reject) => {
      axios
        .request({
          url: `/api/qa/questions/${questionId}/answers`,
          method: 'get'
        })
        .then(data => resolve(data))
        .catch(error => reject(error));
    });
  },
  addAnswer: (questionId, newAnswer) => {
    return new Promise((resolve, reject) => {
      axios
        .request({
          url: `/api/qa/questions/${questionId}/answers`,
          method: 'post',
          data: {
            body: newAnswer.answer,
            name: newAnswer.nickname,
            email: newAnswer.email,
            photos: newAnswer.urls
          }
        })
        .then(() => resolve('Thank you for submitting your answer!'))
        .catch(error => reject(error));
    });
  },
  uploadFile: (file) => {
    const form = new FormData();
    form.append('UPLOADCARE_PUB_KEY', 'ecfa3a2606581daba823');
    form.append('UPLOADCARE_STORE', 'auto');
    form.append('file', file);

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
  },
  addQuestion: (currentProductId, q) => {
    return new Promise((resolve, reject) => {
      axios
        .request({
          url: '/api/qa/questions',
          method: 'post',
          data: {
            body: q.question,
            name: q.nickname,
            email: q.email,
            product_id: currentProductId
          }
        })
        .then(() => resolve('Thank you for submitting your question!'))
        .catch(error => reject(error));
    });
  },
  mark: (id, subject) => {
    let endpoint;

    switch (subject) {
    case 'q':
      endpoint = 'questions';
      break;
    case 'a':
      endpoint = 'answers';
      break;
    }
    return new Promise((resolve, reject) => {
      axios.request({
        url: `api/qa/${endpoint}/${id}/helpful`,
        method: 'put'
      })
        .then((r) => resolve())
        .catch(error => reject(error));
    });
  },
  report: (id, subject) => {
    let endpoint;

    switch (subject) {
    case 'q':
      endpoint = 'questions';
      break;
    case 'a':
      endpoint = 'answers';
      break;
    }
    return new Promise((resolve, reject) => {
      axios.request({
        url: `api/qa/${endpoint}/${id}/report`,
        method: 'put'
      })
        .then(() => resolve())
        .catch(error => reject(error));
    });
  },
  searchQuestion: () => {

  }
};


export default httpRequest;