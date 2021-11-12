import React, { useState } from 'react';
import ReactDom from 'react-dom';

const AnswerModal = ({ question, productInfo, isOpen, closeModal }) => {
  const [answer, setAnswer] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [photos, setPhotos] = useState('');

  // handle photo(file) upload
  // invoke handle add answer

  return ReactDom.createPortal(
    <>
      {isOpen ?
        <>
          <div className="overlay"></div>
          <div className="modal">
            <div className="modal-flex-column">
              <div className="modal-header">
                <h2 style={{marginBottom: '20px'}}>Submit your Answer</h2>
                <h3 style={{textDecoration: 'underline'}}><b>{productInfo}</b>: {question.question_body}</h3>
              </div>
              <div className="modal-body userInfos">
                <label style={{ marginBottom: '5px'}}>Your Answer<span className="mandatory-asterisk">*</span></label>
                <textarea className="text-field" onChange={(e) => setAnswer(e.target.value)}></textarea>
                <br></br>
                <label style={{ marginBottom: '5px'}}>What is your nickname<span className="mandatory-asterisk">*</span></label>
                <input type="text" className="input-field" onChange={(e) => setNickname(e.target.value)} placeholder="Example: jack543!"></input>
                <br></br>
                <label style={{ marginBottom: '5px'}}>Your email<span className="mandatory-asterisk">*</span></label>
                <input type="email" className="input-field" onChange={(e) => setEmail(e.target.value)} placeholder="Example: jack@email.com"></input>
                <br></br>
                <label style={{ marginBottom: '5px'}}>Upload your photos</label>
                <input type="file" onChange={(e) => setPhotos(e.target.value)}></input>
              </div>
              <button className="modal-button" onClick={() => closeModal()}>Submit answer</button>
            </div>

          </div>
        </> : null}

    </>,
    document.getElementById('answer-portal')
  );
};


export default AnswerModal;