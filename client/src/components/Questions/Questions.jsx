import React from 'react';
import QuestionList from './QuestionList.jsx';
import SearchQuestions from './SearchQuestions.jsx';

import httpRequest from './httpRequest.js';

class Questions extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: []
    };
  }

  componentDidMount() {
    const { currentProductId } = this.props;

    httpRequest.fetchQuestion(currentProductId)
      .then((data) =>
        this.setState({
          questions: data
        })
      )
      .catch((error) => console.log(error));
  }

  // handle search
  handleSearch(term) {
    console.log(term);
  }
  // handle add question
  handleAddQuestion() {
    // post HTTP request to server
  }

  handleAddAnswer(questionId, answer) {
    httpRequest.addAnswer(questionId, answer)
      .then((r) => console.log(r))
      .catch((error) => conosle.log(error));
  }
  render() {
    const { questions } = this.state;
    const { productInfo } = this.props;

    return (
      <React.Fragment>
        <div className="questions flex-column">
          <p>QUESTIONS & ANSWERS</p>
          <SearchQuestions handleSearch={this.handleSearch.bind(this)} />
          <QuestionList
            role="q-list"
            questions={questions}
            productInfo={productInfo}
            handleAddQuestion={this.handleAddQuestion.bind(this)}
            handleAddAnswer={this.handleAddAnswer.bind(this)}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Questions;
