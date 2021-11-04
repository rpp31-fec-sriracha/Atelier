import React from 'react';

const QuestionModal = ({ productInfo, handleAddQuestion }) => {
  return (
    <>
      <form onSubmit={() => handleAddQuestion()}>
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
    </>
  );
};

export default QuestionModal;