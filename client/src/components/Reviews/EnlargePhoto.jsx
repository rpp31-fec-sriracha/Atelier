import React from 'react';

const EnlargePhoto = function(props) {

  if (props.isOpen === false) {
    return null;
  }

  return (
    <>
      <div className="overlay"></div>
      <div className="modal">
        <div className="exit">
          <button onClick={() => props.onClose()}>X</button>
        </div>
        <div className="modal-flex-column">
          <img src={props.currentURL}></img>
        </div>
      </div>
    </>

  );
};

export default EnlargePhoto;