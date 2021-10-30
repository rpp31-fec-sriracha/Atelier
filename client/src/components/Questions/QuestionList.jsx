import React from 'react';
import QuestionEntry from './QuestionEntry.jsx';

const QuestionList = function (props) {
  console.log(props)
  return (
    <>
      <QuestionEntry />
      <div className="questions">'QuestionList'</div>
    </>
  );
};

export default QuestionList;