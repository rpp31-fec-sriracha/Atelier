import React, { useState } from 'react';
import ReactDom from 'react-dom';

const QuestionModal = ({ isOpen, productInfo, handleAddQuestion, closeModal }) => {
  const [question, setQuestion] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');

  // invoke hadnle add question onsubmit

  return ReactDom.createPortal(
    <>
      {isOpen ?
        <>
          <div className="overlay-style"></div>
          <div className="modal-style">
            <form onSubmit={() => closeModal()}>
              <div className="modal-title">Ask Your Question</div>
              <div className="modal-subtitle">About the {productInfo}.</div>
              <label>Your Question</label><span id="mandatory-asterisk">*</span>
              <input type="text" name="question" onChange={(e) => setQuestion(e.target.value)}></input>
              <label>What is your nickname</label><span id="mandatory-asterisk">*</span>
              <input type="text" name="nickname" onChange={(e) => setQuestion(e.target.value)}></input>
              <label>Your email</label><span id="mandatory-asterisk">*</span>
              <input type="email" name="email" onChange={(e) => setQuestion(e.target.value)}></input>

              <input type="submit" value="Submit question"></input>
            </form>
          </div>
        </>
        : null
      }
    </>,
    document.getElementById('question-modal')
  );
};

export default QuestionModal;