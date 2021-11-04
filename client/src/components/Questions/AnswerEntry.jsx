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
      <div className="userInfo">
        <span className="username">by {answer.answerer_name} </span>
        <span className="_divider">|</span>
        <span className="date">{answer.date}</span>
        <span className="_divider">|</span>
        <span className="helpful">Helpful?</span>
        <span className="_divider">|</span>
        <button className="increment-helpful">Yes({answer.helpfulness})</button>
      </div>
      <a className="report"></a>
    </>
  );
};

export default AnswerEntry;