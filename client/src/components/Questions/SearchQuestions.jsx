import React, { useState } from 'react';

const SearchQuestions = ({ searchTerm, handleSearch }) => {
  const [search, setSearch] = useState('');

  return (
    <>
      <input className="search-question"
        role="search"
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