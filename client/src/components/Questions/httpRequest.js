import axios from 'axios';

const httpRequest = {
  getQuestion: (currentProductId) => {
    return new Promise((resolve, reject) => {
      axios
        .request({
          url: '/api/qa/questions',
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
          url: '/addAnswer',
          method: 'post',
          data: {
            id: questionId,
            body: newAnswer.answer,
            name: newAnswer.nickname,
            email: newAnswer.email,
            photos: newAnswer.urls
          },
        })
        .then(resolve('Thank you for submitting your answer!'))
        .catch(error =>reject(error)
        );
    });
  },
  uploadFile: (file) => {
    const form = new FormData();
    form.append('photos', file, file.name);

    return new Promise((resolve, reject) => {
      axios.request({
        url: '/upload',
        method: 'post',
        data: form
      })
        .then((result) => resolve(result))
        .catch(error => reject(error));
    });
  },
  addQuestion: (currentProductId, q) => {
    return new Promise((resolve, reject) => {
      axios
        .request({
          url: '/addQuestion',
          method: 'post',
          data: {
            body: q.question,
            name: q.nickname,
            email: q.email,
            product_id: Number(currentProductId)
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
        url: '/helpful',
        method: 'put',
        params: {
          endpoint: endpoint,
          id: id
        }
      })
        .then(resolve())
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
        url: '/report',
        method: 'put',
        params: {
          endpoint: endpoint,
          id: id
        }
      })
        .then(resolve())
        .catch(error => reject(error));
    });
  }
};

export default httpRequest;
