import React, { useState } from 'react';

const AnswerEntry = ({ answer, handleMark }) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const [count, setCount] = useState(0);
  // handle mark helpful
  // handle report answer

  return (
    <>
      <div className="answer">
        <div className="A-body">{answer.body}</div>
        <div className="photo-list">
          {answer.photos.map((photo, i) => <img className="photos" key={i} src={photo}></img>)}
        </div>
        <div className="userInfos">
          <span data-testid="answerer-name">by {answer.answerer_name}, </span>
          <span data-testid="date">{new Intl.DateTimeFormat('en-US', options).format(Date.parse(answer.date))}</span>
          <span className="_divider">|</span>
          <span data-testid="answerer_name">Helpful?</span>
          <span className="_divider">|</span>
          <button data-testid="helpfulness" onClick={(e) => {
            if (count === 1) {
              e.preventDefault();
            } else {
              handleMark(answer.id, 'a');
              setCount(count + 1);
            }
          }} className="helpful-and-report">Yes({answer.helpfulness})</button>
          <span className="_divider">|</span>
          <button className="helpful-and-report">Report</button>
        </div>
      </div>
    </>
  );
};

export default AnswerEntry;