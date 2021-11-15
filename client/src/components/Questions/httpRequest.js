import axios from 'axios';

const httpRequest = {
  fetchQuestion: (currentProductId) => {
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
  },
  addAnswer: (questionId, newAnswer) => {

    console.log(newAnswer);
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
        .then(() => resolve())
        .catch((error) => reject(error));
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
        .then((result) => resolve(result))
        .catch(error => reject(error));
    });
  },
  addQuestion: () => {

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