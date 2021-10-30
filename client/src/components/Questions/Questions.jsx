import React from 'react';
import QuestionList from './QuestionList.jsx';
import SearchQuestions from './SearchQuestions.jsx';
import AddQuestion from './AddQuestion.jsx';
import axios from 'axios';

class Questions extends React.Component {
  constructor() {
    super();
    this.state = {
      productQA: []
    };
  }

  componentDidMount() {
    const { currentProductId } = this.props;
    axios
      .request({
        url: '/questions',
        method: 'get',
        baseURL: 'http://localhost:3000',
        params: {
          productId: currentProductId
        }
      })
      .then((questions) =>
        this.setState({
          productQA: questions.data.results
        })
      )
      .catch((error) => console.log(error));
  }

  render() {
    const { productQA } = this.state;
    return (
      <>
        <div className="questions">
          <SearchQuestions />
          <QuestionList productQA={productQA} />
          <AddQuestion />
        </div>
      </>
    );
  }
}

export default Questions;