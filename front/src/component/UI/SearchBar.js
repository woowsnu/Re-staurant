import React from 'react';
import styles from './SearchBar.module.css';

const SearchBar = () => {
  return (
    <div className={styles.search}>
      <input className={styles.searchbar} type='search' />
    </div>
  );
};

export default SearchBar;
