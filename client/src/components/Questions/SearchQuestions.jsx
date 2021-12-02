import React, { useState } from 'react';

const SearchQuestions = ({ handleSearch }) => {
  const [search, setSearch] = useState('');

  return (
    <>
      <input className="search-question"
        type="text"
        placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          handleSearch(search);
        }}></input>
    </>
  );
};

export default SearchQuestions;