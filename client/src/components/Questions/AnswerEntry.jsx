import React from 'react';

const AnswerEntry = ({ answer }) => {
  // handle mark helpful
  // handle report answer
  return (
    <>
      <div className="answer">
        <div className="answer-flex-row">
          <div className="A-body">{answer.body}</div>
          <div className="photos">
            {answer.photos.map((photo, i) => <img key={i} src={photo.url}></img>)}
          </div>
          <div>
            <span data-testid="answerer-name" className="userInfos">by {answer.answerer_name}</span>
            <span className="_divider">  |  </span>
            <span data-testid="date" className="userInfos">{answer.date}</span>
            <span className="_divider">  |  </span>
            <span data-testid="answerer_name" className="userInfos">Helpful?</span>
            <span className="_divider">  |  </span>
            <button data-testid="helpfulness" className="helpful-and-report userInfos">Yes({answer.helpfulness})</button>
            <span className="_divider">  |  </span>
            <button className="helpful-and-report userInfos">Report</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnswerEntry;