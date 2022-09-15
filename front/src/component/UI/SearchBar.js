import React from 'react';
import styles from './SearchBar.module.css';
import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
  return (
    <form action='' className={styles.search}>
      <input className={styles.searchbar} type='text' />
      <button className={styles.searchbtn} type='submit'><FaSearch style={{fontSize: "22px"}}/></button>
    </form>
  );
};

export default SearchBar;
