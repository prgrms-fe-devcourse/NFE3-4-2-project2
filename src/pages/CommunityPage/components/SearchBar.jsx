import React from 'react';
import searchIcon from '/icons/search.svg';

const SearchBar = ({ onSearch, onSearchSubmit }) => {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSearchSubmit(); 
    }
  };

  return (
    <div className="flex items-center border rounded-r-md px-2 py-1 bg-gray-100 text-sm w-256 h-44 relative -top-50">
      <input
        type="text"
        placeholder="검색어를 입력해주세요"
        className="flex-grow outline-none bg-transparent"
        onChange={(e) => onSearch(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button className="text-orange-500 hover:text-orange-600" onClick={onSearchSubmit}>
        <img src={searchIcon} alt="검색" className="w-19 h-18 mr-10"/>
      </button>
    </div>
  );
};

export default SearchBar;
