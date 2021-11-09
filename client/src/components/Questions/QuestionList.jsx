import React, { useState } from 'react';
import QuestionEntry from './QuestionEntry.jsx';
import QuestionModal from './QuestionModal.jsx';

const QuestionList = function ({ questions, productInfo, handleAddQuestion }) {
  const [visibleCount, setVisibleCount] = useState(2);
  const [isOpen, setModal] = useState(false);

  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };


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
        <button className="add-q" role="add-quesiton" onClick={() => openModal()}>AddQuestion</button>
        <QuestionModal
          role="q-modal"
          isOpen={isOpen}
          productInfo={productInfo}
          closeModal={closeModal.bind(this)}
          handleAddQuestion={handleAddQuestion}>
        </QuestionModal>
      </div>
    </>
  );
};

export default QuestionList;