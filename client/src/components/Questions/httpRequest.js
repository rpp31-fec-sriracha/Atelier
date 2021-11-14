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
            photos: newAnswer.photos
          }
        })
        .then(() => resolve())
        .catch((error) => reject(error));
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