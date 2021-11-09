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
      .catch((error) => conosle.log(error));
  }

  // handle search
  handleSearch(term) {
    console.log(term);
  }
  // handle add question
  handleAddQuestion() {
    // validate form inputs
    // if there's any invalid entries,
    // render warning message "You must enter the following:”
    // post HTTP request to server
  }

  render() {
    const { questions } = this.state;
    const { productInfo } = this.props;

    return (
      <>
        <div className="questions flex-column">
          <p>QUESTIONS & ANSWERS</p>
          <SearchQuestions handleSearch={this.handleSearch.bind(this)} />
          <QuestionList questions={questions} productInfo={productInfo} handleAddQuestion={this.handleAddQuestion.bind(this)} />
        </div>
      </>
    );
  }
}

export default Questions;
