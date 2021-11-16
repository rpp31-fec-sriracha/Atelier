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

    httpRequest.getQuestion(currentProductId)
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

  handleAddQuestion() {
    // post HTTP request to server
    httpRequest.addQuestion().then().catch();
  }

  handleAddAnswer(questionId, answer) {
    httpRequest.addAnswer(questionId, answer)
      .then(() =>
        httpRequest
          .getQuestion(this.props.currentProductId)
          .then((a) => this.setState({ questions: a }))
      )
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
