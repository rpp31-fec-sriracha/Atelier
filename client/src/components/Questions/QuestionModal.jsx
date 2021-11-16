import React, { useState } from 'react';
import ReactDom from 'react-dom';

const QuestionModal = ({ isOpen, productInfo, handleAddQuestion, closeModal }) => {
  const [question, setQuestion] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');

  // invoke hadnle add question onsubmit

  return ReactDom.createPortal(
    <React.Fragment>
      {isOpen ?
        <React.Fragment>
          <div className="overlay"></div>
          <div className="modal">
            <div className="modal-flex-column">
              <div className="modal-header">
                <h2>Ask Your Question</h2>
                <br></br>
                <h3 data-testid="product-name" style={{textDecoration: 'underline'}}>About the {productInfo}.</h3>
              </div>
              <div className="modal-body userInfos">
                <label style={{ marginBottom: '5px'}}>Your Question<span className="mandatory">*</span></label>
                <input id="question" className="input-field" value={question} type="text" onChange={(e) => setQuestion(e.target.value)}></input>
                <br></br>
                <label style={{ marginBottom: '5px'}}>What is your nickname<span className="mandatory">*</span></label>
                <input id="nickname" className="input-field" value={nickname} type="text" onChange={(e) => setNickname(e.target.value)}></input>
                <br></br>
                <label style={{ marginBottom: '5px'}}>Your email<span className="mandatory">*</span></label>
                <input id="email" className="input-field" value={email} type="email" onChange={(e) => setEmail(e.target.value)}></input>
              </div>
              <button className="modal-button" onClick={() => {
                handleAddQuestion({question, nickname, email});
                closeModal();
              }}>Submit question</button>
            </div>
          </div>
        </React.Fragment>
        : null
      }
    </React.Fragment>,
    document.getElementById('question-modal')
  );
};

export default QuestionModal;