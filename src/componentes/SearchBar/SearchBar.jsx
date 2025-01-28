import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ items, onSearchResults }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCriterion, setSearchCriterion] = useState('nombre');

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filteredItems = items.filter((item) =>
      item[searchCriterion]?.toLowerCase().includes(query) 
    );

    onSearchResults(filteredItems);
  };

  const handleCriterionChange = (event) => {
    setSearchCriterion(event.target.value);
    setSearchQuery(''); 
    onSearchResults(items); 
  };

  return (
    <div className="search-bar-container">
      <div className="criteria-selector">
        <select value={searchCriterion} onChange={handleCriterionChange}>
          <option value="nombre">Nombre</option>
          <option value="autor">Autor</option>
          <option value="genero">Género</option>
          <option value="ISBN">ISBN</option>
        </select>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder={`Buscar por ${searchCriterion}...`}
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
    </div>
  );
};

export default SearchBar;
