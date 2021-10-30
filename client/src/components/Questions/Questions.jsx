import React from 'react';
import QuestionList from './QuestionList.jsx';
import SearchQuestions from './SearchQuestions.jsx';
import AddQuestion from './AddQuestion.jsx';
import fetchQuestion from './httpRequest.js';

class Questions extends React.Component {
  constructor() {
    super();
    this.state = {
      productQA: []
    };
  }

  componentDidMount() {
    const { currentProductId } = this.props;

    fetchQuestion(currentProductId)
      .then((data) =>
        this.setState({
          productQA: data
        })
      )
      .catch((error) => conosle.log(error));
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