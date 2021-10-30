import React from 'react';
import AnswerEntry from './AnswerEntry.jsx';

const QuestionEntry = ({ question }) => {

  return (
    <>
      <div className="question">
        <span className="Q">Q:</span>
        <span className="Q-body">{question.question_body}</span>
        <div className="helful">Helpful?</div>
        <div className="add-answer">Add Answer</div>
        <div className="answers-list">
          <span className="A">A:</span>
          {Object.keys(question.answers).map((id, i) => {
            let answer = question.answers[id];
            return <AnswerEntry key={i} answer={answer} />;
          })}
        </div>
      </div>

    </>
  );
};

export default QuestionEntry;