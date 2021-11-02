import React from 'react';

const AnswerEntry = ({ answer }) => {
  // handle mark helpful
  // handle report answer
  return (
    <>
      <div className="A-body">{answer.body}</div>
      <div className="photos">
        {answer.photos.map((photo, i) => <img key={i} src={photo.url}></img>)}
      </div>
      <div className="userInfo">by
        <span className="username">{answer.answerer_name}</span>
        <span className="date">{answer.date}</span>
      </div>
      <span className="helpfulness">Helpful? <a>Yes({answer.helpfulness})</a></span>
      <a className="report"></a>
    </>
  );
};

export default AnswerEntry;