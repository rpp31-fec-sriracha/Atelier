import React from 'react';
import QuestionList from './QuestionList.jsx';
import SearchQuestions from './SearchQuestions.jsx';
import AddQuestion from './AddQuestion.jsx';
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
  render() {
    const { questions } = this.state;
    const { productInfo } = this.props;

    return (
      <>
        <div className="questions">
          <SearchQuestions handleSearch={this.handleSearch.bind(this)} />
          <QuestionList questions={questions} productInfo={productInfo} />
          <AddQuestion productInfo={productInfo} />
        </div>
      </>
    );
  }
}

export default Questions;