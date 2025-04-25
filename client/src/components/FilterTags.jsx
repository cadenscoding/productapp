import React from 'react';
import '../styles/FilterTags.css';

const filterOptions = ['All', 'UI', 'UX', 'Enhancement', 'Bug', 'Feature'];

const FilterTags = ({ selected, onSelect }) => {
  return (
    <div className="filter-tags">
      {filterOptions.map((tag) => (
        <button
          key={tag}
          className={`filter-tag-btn ${selected === tag ? 'active' : ''}`}
          onClick={() => onSelect(tag)} 
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default FilterTags;