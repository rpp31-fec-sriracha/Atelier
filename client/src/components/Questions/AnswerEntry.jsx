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
        <span data-testid="answerer-name" className="username">by {answer.answerer_name} </span>
        <span className="_divider">|</span>
        <span data-testid="date" className="date">{answer.date}</span>
        <span className="_divider">|</span>
        <span data-testid="answerer_name" className="helpful">Helpful?</span>
        <span className="_divider">|</span>
        <button data-testid="helpfulness" className="helpful-and-report">Yes({answer.helpfulness})</button>
        <span className="_divider">|</span>
        <button className="helpful-and-report">Report</button>
      </div>
    </>
  );
};

export default AnswerEntry;