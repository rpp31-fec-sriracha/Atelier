import React from 'react';

const AnswerEntry = ({ answer }) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  // handle mark helpful
  // handle report answer
  return (
    <>
      <div className="answer">
        <div className="A-body">{answer.body}</div>
        <div className="photos">
          {answer.photos.map((photo, i) => <img key={i} src={photo.url}></img>)}
        </div>
        <div className="userInfos">
          <span data-testid="answerer-name">by {answer.answerer_name}, </span>
          <span data-testid="date">{new Intl.DateTimeFormat('en-US', options).format(Date.parse(answer.date))}</span>
          <span className="_divider">|</span>
          <span data-testid="answerer_name">Helpful?</span>
          <span className="_divider">|</span>
          <button data-testid="helpfulness" className="helpful-and-report">Yes({answer.helpfulness})</button>
          <span className="_divider">|</span>
          <button className="helpful-and-report">Report</button>
        </div>
      </div>
    </>
  );
};

export default AnswerEntry;