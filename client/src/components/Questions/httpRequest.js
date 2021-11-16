import axios from 'axios';

const httpRequest = {
  getQuestion: (currentProductId) => {
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
        .then(q => resolve(q.data.results))
        .catch(error => reject(error));
    });
  },
  getAnswers: (questionId) => {
    return new Promise((resolve, reject) => {
      axios
        .request({
          url: `/api/qa/questions/${questionId}/answers`,
          method: 'get',
          baseURL: 'http://localhost:3000'
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
          baseURL: 'http://localhost:3000',
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
          baseURL: 'http://localhost:3000',
          data: {
            body: q.question,
            name: q.nickname,
            email: q.email,
            product_id: currentProductId
          }
        })
        .then(() =>resolve('Thank you for submitting your question!'))
        .catch(error => reject(error));
    });
  },
  markQuestionHelpfulness: () => {

  },
  markAnswerHelpfulness: () => {

  },
  reportQuestion: () => {

  },
  reportAnswer: () => {

  },
  searchQuestion: () => {

  }
};


export default httpRequest;