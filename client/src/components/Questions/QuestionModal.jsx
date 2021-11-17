import React, { useState } from 'react';
import ReactDom from 'react-dom';

const QuestionModal = ({ isOpen, productInfo, handleAddQuestion, closeModal }) => {

  const [values, setValues] = useState({
    question: '',
    nickname: '',
    email: ''
  });
  const [messages, setMessages] = useState({
    warning: '',
    notification1: '',
    notification2: '',
  });
  const [invalid, setValidation] = useState(false);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleValidate = (e) => {
    if (Object.values(values).every((v) => v !== '')) {
      handleAddQuestion(values);
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
    <React.Fragment>
      {isOpen ?
        <React.Fragment>
          <div className="overlay"></div>
          <div className="modal">
            <div className="exit">
              <button onClick={() => closeModal()}>X</button>
            </div>
            <div className="modal-flex-column">
              <div className="modal-header">
                <h2 style={{marginBottom: 20}}>Ask Your Question</h2>
                <h3 style={{textDecoration: 'underline'}} data-testid="product-name">About the {productInfo}</h3>
              </div>
              <div className="warning">
                <p>{messages['warning']}</p>
              </div>
              <br/>
              <div className="modal-body userInfos">
                <label style={{ marginBottom: '5px'}}>Your Question<span className="mandatory">*</span></label>
                <textarea style={(invalid && !values['question']) ? { border: 'red solid 1px' } : { border: '#e6e6e6 solid 1px' }}
                  name="question" required maxLength="1000"
                  className="input-field" type="text" onChange={handleChange}></textarea>
                <br/>
                <label style={{ marginBottom: '5px'}}>What is your nickname<span className="mandatory">*</span></label>
                <input style={(invalid && !values['nickname']) ? { border: 'red solid 1px' } : { border: '#e6e6e6 solid 1px' }}
                  name="nickname" required maxLength="60" onFocus={handleFocus} onBlur={handleBlur} placeholder="Example: jackson11!"
                  className="input-field" type="text" onChange={handleChange}></input>
                  <div className="popup-message">{messages['notification1']}</div>
                <br/>
                <label style={{ marginBottom: '5px'}}>Your email<span className="mandatory">*</span></label>
                <input style={(invalid && !values['email']) ? { border: 'red solid 1px' } : { border: '#e6e6e6 solid 1px' }}
                  name="email" required maxLength="60" onFocus={handleFocus} onBlur={handleBlur} placeholder="Why did you like the product or not?"
                  className="input-field" type="email" onChange={handleChange}></input>
                <div className="popup-message">{messages['notification2']}</div>
              </div>
              <button className="modal-button" onClick={handleValidate}>Submit question</button>
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