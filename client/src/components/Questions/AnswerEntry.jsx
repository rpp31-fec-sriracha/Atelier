import React, { useState } from 'react';
import httpRequest from './httpRequest.js';
import ImageModal from './ImageModal.jsx';

const AnswerEntry = ({ answer }) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const [isOpen, setModal] = useState(false);
  const [markCount, setMarkCount] = useState(0);
  const [reportCount, setReportCount] = useState(0);
  const [report, setReport] = useState('Report');
  const [mark, setMark] = useState(answer.helpfulness);
  const [src, setSrc] = useState('');

  const handleReport = (id, subject) => {
    httpRequest.report(id, subject)
      .then(setReport('Reported'))
      .catch((error) => window.alert(error));
  };

  const handleMark = (id, subject) => {
    httpRequest.mark(id, subject)
      .then(setMark(mark + 1))
      .catch((error) => window.alert(error));
  };
  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };
  const handleimageclick = (e) => {
    setSrc(e.target.src);
    openModal();
  };

  return (
    <>
      <div className="answer">
        <div className="A-body">{answer.body}</div>
        <div className="photo-list" >
          {answer.photos.map((photo, i) =>
            <img className="photos" key={i} src={photo.concat('-/resize/320x/fallback.jpg')} srcset={
              photo.concat('-/resize/450x/450.jpg 450w'),
              photo.concat('-/resize/640x/640.jpg 640w'),
              photo.concat('-/resize/1000x/-/quality/lighter/1000.jpg 1000w')
            } onClick={handleimageclick}></img>
          )}
          {isOpen ? <ImageModal isOpen={isOpen} closeModal={closeModal} src={src}></ImageModal> : null}
        </div>
        <div className="userInfos">
          <span data-testid="answerer-name">by {(answer.answerer_name.toLowerCase() === 'seller') ? <b>{answer.answerer_name}</b> : answer.answerer_name}, </span>
          <span data-testid="date">{new Intl.DateTimeFormat('en-US', options).format(Date.parse(answer.date))}</span>
          <span className="_divider">|</span>
          <span data-testid="answerer_name">Helpful?</span>
          <span className="_divider">|</span>
          <button data-testid="helpfulness" onClick={(e) => {
            if (markCount === 1) {
              e.preventDefault();
            } else {
              handleMark(answer.id, 'a');
              setMarkCount(markCount + 1);
            }
          }} className="helpful-and-report">Yes({mark})</button>
          <span className="_divider">|</span>
          <button className="helpful-and-report" onClick={(e) => {
            if (reportCount === 1) {
              e.preventDefault();
            } else {
              handleReport(answer.id, 'a');
              setReportCount(reportCount + 1);
            }
          }}>{report}</button>
        </div>
      </div>
    </>
  );
};

export default AnswerEntry;