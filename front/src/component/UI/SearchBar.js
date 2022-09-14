import React from 'react';
import styles from './SearchBar.module.css';
import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
  return (
    <form action='' className={styles.search}>
      <label><FaSearch style={{fontSize: "20px"}}/></label>
      <input className={styles.searchbar} type='text' />
      <button type='submit'>검색</button>
    </form>
  );
};

export default SearchBar;
