import React, { useState } from 'react';
import QuestionEntry from './QuestionEntry.jsx';
import QuestionModal from './QuestionModal.jsx';
import SearchQuestions from './SearchQuestions.jsx';

const QuestionList = function ({ questions, productInfo, handleAddQuestion, handleAddAnswer }) {
  const [visibleCount, setVisibleCount] = useState(2);
  const [isOpen, setModal] = useState(false);
  const [filteredQuestions, setFilter] = useState([]);
  const [mode, setMode] = useState(false);

  const handleSearch = (term) => {
    if (term.length >= 2) {
      const result = questions.filter(q => q.question_body.toLowerCase().includes(term));
      setFilter(result);
      setMode(true);
    } else {
      setFilter([]);
      setMode(false);
      setVisibleCount(2);
    }
  };
  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };
  const handleClick = (e) => {
    if (visibleCount >= questions.length) {
      e.preventDefault();
    } else {
      setVisibleCount(visibleCount + 2);
    }
  };
  const renderButton = () => {
    if (questions.length > 2) {
      if (visibleCount >= questions.length) {
        return null;
      } else {
        return <button className="col-1-3 add-q b-left" onClick={handleClick}>MORE ANSWERED QUESTIONS</button>;
      }
    } else {
      return null;
    }
  };

  return (
    <>
      <SearchQuestions handleSearch={handleSearch} />
      {(mode) ?
        <div>
          <div className="q-container">
            {(filteredQuestions.length > 0) ?
              filteredQuestions.slice(0, visibleCount).map((question, i) =>
                <QuestionEntry data-testid="found" key={i} question={question} productInfo={productInfo} handleAddAnswer={handleAddAnswer} />)
              : <div></div>}
          </div>
          <div className="buttons">
            {(filteredQuestions.length > 2) ?
              <button className="col-1-3 add-q b-left" onClick={handleClick}>MORE ANSWERED QUESTIONS</button>
              : <div></div>}
            <span className="_divider"></span>
            <button className="add-q b-right" onClick={() => openModal()}>ADD A QUESTION +</button>
          </div>
        </div> :
        <div>
          <div className="q-container">
            {(questions.length > 0) ?
              questions.slice(0, visibleCount).map((question, i) =>
                <QuestionEntry key={i} question={question} productInfo={productInfo} handleAddAnswer={handleAddAnswer} />)
              : <div></div>}
          </div>
          <div className="buttons">
            {renderButton()}
            <span className="_divider"></span>
            <button className="add-q b-right" onClick={() => openModal()}>ADD A QUESTION +</button>
          </div>
        </div>}
      {isOpen ?
        <QuestionModal
          isOpen={isOpen}
          productInfo={productInfo}
          closeModal={closeModal.bind(this)}
          handleAddQuestion={handleAddQuestion}>
        </QuestionModal> : null}
    </>
  );
};

export default QuestionList;