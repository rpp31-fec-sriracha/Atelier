import React from 'react';
import QuestionEntry from './QuestionEntry.jsx';

const QuestionList = function ({ questions, productInfo}) {
  return (
    <>
      <div className="questions">
        {(questions.length > 0) ?
          questions.map((question, i) => <QuestionEntry key={i} question={question} productInfo={productInfo} />)
          : null}
      </div>
    </>
  );
};

export default QuestionList;