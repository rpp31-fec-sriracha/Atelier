import React from 'react';

const AnswerEntry = (props) => {
  console.log(props);
  return (
    <>
      <div className="A-body">answer body</div>
      <span className="userInfo"></span>
      <span className="selection"></span>
      <span className="report"></span>
    </>
  );
};

export default AnswerEntry;