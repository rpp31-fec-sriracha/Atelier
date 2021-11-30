import React, { useState } from 'react';
import ReactDom from 'react-dom';

const ImageModal = ({ src, isOpen, closeModal}) => {

  return (
    <>
      {isOpen ?
        <>
          <div className="overlay"></div>
          <div className="modal">
            <div className="exit">
              <button onClick={() => closeModal()}>X</button>
            </div>
            <div className="modal-flex-column">
              <img src={src}></img>
            </div>
          </div>
        </> : null}
    </>
  );
};


export default ImageModal;