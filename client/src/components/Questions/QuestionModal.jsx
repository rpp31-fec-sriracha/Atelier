import React, { useState } from 'react';
import ReactDom from 'react-dom';

const QuestionModal = ({ isOpen, productInfo, handleAddQuestion, closeModal }) => {
  const [question, setQuestion] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');

  // handle input change
  const handleInputChange = () => {
    // update the state
  };
  // invoke hadnle add question onsubmit

  return ReactDom.createPortal(
    <>
      {isOpen ? <form onSubmit={() => closeModal()}>
        <div className="modal-title">Ask Your Question</div>
        <div className="modal-subtitle">About the {productInfo}.</div>
        <label>Your Question</label><span id="mandatory-asterisk">*</span>
        <input type="text" name="question"></input>
        <label>What is your nickname</label><span id="mandatory-asterisk">*</span>
        <input type="text" name="nickname"></input>
        <label>Your email</label><span id="mandatory-asterisk">*</span>
        <input type="email" name="email"></input>

        <input type="submit" value="Submit question"></input>
      </form>
        : null
      }
    </>,
    document.getElementById('question-modal')
  );
};

export default QuestionModal;