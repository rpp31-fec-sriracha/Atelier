import { React, useState, useEffect } from 'react';
import QuestionList from './QuestionList.jsx';
import getQuestions from './../../../../server/api.js';

const Questions = function (props) {
  const { productQA, currentProductId } = this.props;

  useEffect(() => {
    // fetch getQuestions
    getQuestions(currentProductId, 1, 2, () => {
      // update the state of productQA
    });
  }, []);


  return (
    <>
      <QuestionList />
      <div className="questions">'Questions'</div>
    </>
  );
};

export default Questions;