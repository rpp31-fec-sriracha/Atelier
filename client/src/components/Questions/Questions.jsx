import React from 'react';
import QuestionList from './QuestionList.jsx';
import httpRequest from './httpRequest.js';
import Interactions from '../Interactions.jsx';

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
          questions: data.sort((a, b) => b.question_helpfulness - a.question_helpfulness)
        })
      )
      .catch((error) => console.log(error));
  }

  handleAddQuestion(question) {
    httpRequest
      .addQuestion(this.props.currentProductId, question)
      .then((result) => {
        httpRequest
          .getQuestion(this.props.currentProductId)
          .then((a) => this.setState({ questions: a }));
        return result;
      })
      .then((result) => window.alert(result))
      .catch((error) => console.log(error));
  }

  handleAddAnswer(questionId, answer) {
    httpRequest
      .addAnswer(questionId, answer)
      .then((result) => {
        setTimeout(() => httpRequest
          .getQuestion(this.props.currentProductId)
          .then((a) => this.setState({ questions: a }))
        , 2000);
        return result;
      })
      .then((result) => window.alert(result))
      .catch((error) => console.log(error));
  }

  render() {
    const { questions } = this.state;
    const { productInfo } = this.props;

    return (
      <Interactions displayName="Container" widget="Reviews" children={
        <div className="questions flex-column">
          <p>QUESTIONS & ANSWERS</p>

          <QuestionList
            questions={questions}
            productInfo={productInfo}
            handleAddQuestion={this.handleAddQuestion.bind(this)}
            handleAddAnswer={this.handleAddAnswer.bind(this)}
          />
        </div>
      }>
      </Interactions>
    );
  }
}

export default Questions;
