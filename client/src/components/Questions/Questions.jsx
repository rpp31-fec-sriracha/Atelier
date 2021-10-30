import React from 'react';
import QuestionList from './QuestionList.jsx';
import getQuestions from './../../../../server/api.js';

class Questions extends React.Component {

  constructor() {
    super();
    this.state = {
      productQA: []
    };
  }

  componentDidMount() {
    // fetch getQuestions
    getQuestions(currentProductId, (data) => {
      // update the state of productQA
      this.setState({
        productQA: data
      });
    });
  }

  render() {
    const { currentProductId } = this.props;
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