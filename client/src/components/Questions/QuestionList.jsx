import React from 'react';
import QuestionEntry from './QuestionEntry.jsx';

const QuestionList = function ({ productQA }) {
  return (
    <>
      {(productQA.length > 0) ?
        productQA.map((question, i) => <QuestionEntry key={i} question={question} /> ) :
        <div className="questions">'QuestionList'</div>}
    </>
  );
};

export default QuestionList;