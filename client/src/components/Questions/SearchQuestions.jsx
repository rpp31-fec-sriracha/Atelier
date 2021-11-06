import React, { useState } from 'react';

const SearchQuestions = ({ searchTerm, handleSearch }) => {
  const [search, setSearch] = useState('');

  return (
    <>
      <div className="search-question">
        <input
          role="search"
          type="text"
          placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            // only start filter when search.length >= 3
            if (search.length >= 3) {
              handleSearch(search);
            }
          }}></input>
      </div>
    </>
  );
};

export default SearchQuestions;