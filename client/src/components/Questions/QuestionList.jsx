import React from 'react';
import QuestionEntry from './QuestionEntry.jsx';

const QuestionList = function ({ questions }) {
  return (
    <>
      {(questions.length > 0) ?
        questions.map((question, i) => <QuestionEntry key={i} question={question} />)
        : <div className="questions">'QuestionList'</div>}
    </>
  );
};

export default QuestionList;