import React, { useState } from 'react';
import ReactDom from 'react-dom';
import httpRequest from './httpRequest.js'

const AnswerModal = ({ question, productInfo, isOpen, closeModal, handleAddAnswer }) => {
  const [values, setValues] = useState({
    answer: '',
    nickname: '',
    email: ''
  });
  const [photos, setPhotos] = useState([]);
  const [urls, setUrls] = useState([]);

  const [messages, setMessages] = useState({
    warning: '',
    notification1: '',
    notification2: '',
  });
  const [invalid, setValidation] = useState(false);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      httpRequest.uploadFile(file)
        .then(result => {
          const { file } = result.data;
          const delivery = `https://ucarecdn.com/${file}/`;
          setUrls([delivery, ...urls]);
        })
        .catch(error => console.log(error))
      setPhotos([URL.createObjectURL(file), ...photos]);
    }
  };

  const handleValidate = (e) => {
    if (Object.values(values).every((v) => v !== '')) {
      handleAddAnswer(question.question_id, { ...values, urls });
      setValidation(false);
      closeModal();
    } else {
      e.preventDefault();
      setMessages({ warning: 'You must enter the following ' });
      setValidation(true);
    }
  };

  const handleBlur = (e) => {
    switch (e.target.name) {
      case 'email':
        const pattern = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        (!pattern.test(values['email'])) ? setMessages({ warning: 'Please enter valid email address' }) : setMessages({warning: ''})
        break;
      case 'nickname':
        setMessages({notification1: ''})
        break;
      default:
        setMessages({notification2: ''})
    }
  }
  const handleFocus = (e) => {
    switch(e.target.name) {
      case 'nickname':
        setMessages({ notification1: 'For privacy reasons, do not use your full name or email address' })
        break;
      case 'email':
        setMessages({ notification2: 'For authentication reasons, you will not be emailed' })
        break;
    }
  }

  return ReactDom.createPortal(
    <>
      {isOpen ?
        <>
          <div className="overlay"></div>
          <div className="modal">
            <div className="modal-flex-column">
              <div className="modal-header">
                <h2 style={{marginBottom: 20}}>Submit your Answer</h2>
                <h3 style={{textDecoration: 'underline'}}><b>{productInfo}</b>: {question.question_body}</h3>
              </div>
              <div className="warning">
                <p>{messages['warning']}</p>
              </div>
              <br/>
              <div className="modal-body userInfos">
                <label htmlFor="answer-text">Your Answer<span className="mandatory">*</span></label>
                <textarea style={(invalid && !values['answer']) ? { border: 'red solid 1px' } : { border: '#e6e6e6 solid 1px' }}
                  name="answer" id="answer-text" className="text-field" onChange={handleChange}
                  required maxLength="1000"></textarea>
                <br/>
                <label>What is your nickname<span className="mandatory">*</span></label>
                <input style={(invalid && !values['nickname']) ? { border: 'red solid 1px' } : { border: '#e6e6e6 solid 1px' }}
                  name="nickname" onChange={handleChange} placeholder="Example: jack543!" type="text"
                  required maxLength="60" onFocus={handleFocus} onBlur={handleBlur}></input>
                <div className="popup-message">{messages['notification1']}</div>
                <br/>
                <label>Your email<span className="mandatory">*</span></label>
                <input style={(invalid && !values['email']) ? { border: 'red solid 1px' } : { border: '#e6e6e6 solid 1px' }}
                  name="email" type="email" onChange={handleChange} placeholder="Example: jack@email.com"
                  required maxLength="60" onBlur={handleBlur} onFocus={handleFocus}></input>
                <div className="popup-message">{messages['notification2']}</div>
                <br/>
                <label>Upload your photos</label>
                <div className="preview">
                  {photos.map((photo, i) => <img src={photo} className="thumbnails" key={i} ></img>)}
                </div>
                {(photos.length >= 5) ? <div></div> : <input className="input-file" type="file" name="photos" accept="image/*" multiple onChange={handleFileUpload}></input>}
              </div>
              <button className="modal-button" onClick={handleValidate}>Submit answer</button>
            </div>
          </div>
        </> : null}

    </>,
    document.getElementById('answer-portal')
  );
};


export default AnswerModal;