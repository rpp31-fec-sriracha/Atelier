import React, { useState } from 'react';
import ReactDom from 'react-dom';

const AnswerModal = ({ question, productInfo, isOpen, closeModal, handleAddAnswer }) => {
  const [answer, setAnswer] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [photos, setPhotos] = useState([]);
  const [valid, setValidation] = useState(false);

  // handle photo(file) upload
  const handleFileUpload = (e) => {
    const files = e.target.files;

    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          setPhotos([reader.result, ...photos]); // right now only 1 by 1 user can add images.
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // add alt attribute for accessibility


  // invoke handle add answer
  // validation should happend at the client side
  // validate form inputs
  // if there's any invalid entries,
  // render warning message "You must enter the following:”
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
                <label htmlFor="answer-text" style={{ marginBottom: '5px'}}>Your Answer<span className="mandatory-asterisk">*</span></label>
                <textarea id="answer-text" className="text-field" onChange={(e) => setAnswer(e.target.value)}></textarea>
                <br></br>
                <label style={{ marginBottom: '5px'}}>What is your nickname<span className="mandatory-asterisk">*</span></label>
                <input type="text" className="input-field" onChange={(e) => setNickname(e.target.value)} placeholder="Example: jack543!"></input>
                <br></br>
                <label style={{ marginBottom: '5px'}}>Your email<span className="mandatory-asterisk">*</span></label>
                <input type="email" className="input-field" onChange={(e) => setEmail(e.target.value)} placeholder="Example: jack@email.com"></input>
                <br></br>
                <label style={{ marginBottom: '5px'}}>Upload your photos</label>
                <div className="preview">
                  {photos.map((photo, i) => <img className="thumbnails" key={i} src={photo}></img>)}
                </div>
                {(photos.length >= 5) ? <div></div> : <input type="file" accept="image/*" multiple onChange={handleFileUpload}></input>}
              </div>
              <button className="modal-button" onClick={(e) => {
                if (valid) {
                  handleAddAnswer(question.question_id, { answer, nickname, email, photos });
                  closeModal();
                } else {
                  e.preventDefault();
                }
              }}>Submit answer</button>
              <div>You must enter the following:</div>
            </div>
          </div>
        </> : null}

    </>,
    document.getElementById('answer-portal')
  );
};


export default AnswerModal;