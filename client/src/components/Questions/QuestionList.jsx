import React, { useState } from 'react';
import QuestionEntry from './QuestionEntry.jsx';

const QuestionList = function ({ questions, productInfo }) {
  const [visibleCount, setVisibleCount] = useState(2);

  return (
    <>
      <div className="list-container">
        {(questions.length > 0) ?
          questions.slice(0, visibleCount).map((question, i) =>
            <QuestionEntry role="single-question" key={i} question={question} productInfo={productInfo} />)
          : <div></div>}
        {(questions.length > 0) ?
          <button className="col-1-3" onClick={() => setVisibleCount(visibleCount + 2)}>MORE ANSWERED QUESTIONS</button>
          : <div></div>}
      </div>
    </>
  );
};

export default QuestionList;