import React from 'react';
import './SearchInput.css'
const SearchInput = ({ setSearchTerm }) => {
  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <label htmlFor="searchInput">Search Product:</label>
      <input
        type="text"
        id="searchInput"
        onChange={handleSearch}
        placeholder="Search by product name..."
        className="search-input"
      />
    </div>
  );
};

export default SearchInput;
