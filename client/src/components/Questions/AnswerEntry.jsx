import React from 'react';

const AnswerEntry = ({ answer }) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  // handle mark helpful
  // handle report answe
  console.log(answer);
  return (
    <>
      <div className="answer">
        <div className="A-body">{answer.body}</div>
        <div className="photo-list">
          {answer.photos.map((photo, i) => <img className="photos" key={i} src={photo}></img>)}
          {/* <img className="photos" src="http://localhost:3000/ed3516f7-0bc8-4f78-a111-4e490975d676"></img> */}
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