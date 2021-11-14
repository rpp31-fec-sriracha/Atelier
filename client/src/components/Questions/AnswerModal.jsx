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
  const [message, setMessage] = useState('');
  const [invalid, setValidation] = useState(false);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e) => {
    const files = e.target.files;


    // if (files) {
    //   Array.from(files).forEach((file) => {
    //     const imageUrl = URL.createObjectURL(file)
    //     setPhotos([imageUrl, ...photos]); // right now only 1 by 1 user can add images.
    //   });
    // }
    if (files) {
      Array.from(files).forEach((file) => {
        httpRequest.uploadFile(file)
          .then(result => {
            const { file } = result.data;
            const delivery = `https://ucarecdn.com/${file}`;
          })
        .catch(error => console.log(error))
        // setPhotos([reader.result, ...photos]); // right now only 1 by 1 user can add images.
      });
    }

    // if (files) {
    //   Array.from(files).forEach((file) => {
    //     const reader = new FileReader();
    //     reader.onload = () => {

    //       httpRequest.uploadcare(reader.result.slice(23))
    //       .then((uuid) => console.log(uuid))
    //       .catch(error => console.log(error))
    //       // setPhotos([reader.result, ...photos]); // right now only 1 by 1 user can add images.
    //     };
    //     reader.readAsDataURL(file);
    //   });
    // }

    // make http request to uploadcare
    // httpRequest.uploadcare().then().catch()
    // get uuid
    // send those group of uuids of image to atelier server to post

  };

  const handleValidate = (e) => {

    if (Object.values(values).every((v) => v !== '')) {
      handleAddAnswer(question.question_id, { ...values, photos });
      setValidation(false);
      closeModal();
    } else {
      e.preventDefault();
      setMessage('You must enter the following: ');
      setValidation(true);
    }
  };

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
                <p>{message}</p>
              </div>
              <br></br>
              <div className="modal-body userInfos">
                <label htmlFor="answer-text">Your Answer<span className="mandatory">*</span></label>
                <textarea style={(invalid && !values['answer']) ? {border: 'red solid 1px'} : {border: '#e6e6e6 solid 1px'}} name="answer" required id="answer-text" className="text-field" onChange={handleChange}></textarea>
                <br></br>
                <label>What is your nickname<span className="mandatory">*</span></label>
                <input style={(invalid&& !values['nickname']) ? {border: 'red solid 1px'} : {border: '#e6e6e6 solid 1px'}} name="nickname" required type="text" className="input-field" onChange={handleChange} placeholder="Example: jack543!"></input>
                <br></br>
                <label>Your email<span className="mandatory">*</span></label>
                <input style={(invalid && !values['email']) ? {border: 'red solid 1px'} : {border: '#e6e6e6 solid 1px'}} name="email" required type="email" className="input-field" onChange={handleChange} placeholder="Example: jack@email.com"></input>
                <br></br>
                <label>Upload your photos</label>
                <div className="preview">
                  {photos.map((photo, i) => <img src={photo} className="thumbnails" key={i} ></img>)}
                </div>
                {(photos.length >= 5) ? <div></div> : <input type="file" name="photos" accept="image/*" multiple onChange={handleFileUpload}></input>}
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