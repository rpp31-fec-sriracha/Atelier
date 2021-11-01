import React, { useState } from 'react';
import AnswerEntry from './AnswerEntry.jsx';
import AnswerModal from './AnswerModal.jsx';

const QuestionEntry = ({ question, productInfo }) => {
  const [isOpen, setOpen] = useState(false);
  // handle open modal
  // handle close modal
  // handle report question
  // handle mark helpful
  // handle add answer
  // render < AnswerModal >
  return (
    <>
      <div className="question">
        <span className="Q">Q:</span>
        <span className="Q-body">{question.question_body}</span>
        <div>
          <div className="helful">Helpful? <a>Yes({question.question_helpfulness})</a></div>
          <a className="add-answer">Add Answer</a>
          <AnswerModal question={question} productInfo={productInfo} isOpen={isOpen} />
        </div>
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