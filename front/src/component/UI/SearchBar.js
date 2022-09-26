import React, { useState } from 'react';
import styles from './SearchBar.module.css';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [search, setSearch] = useState();

  const resSearchHandler = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  }

  const navigate = useNavigate();
  const searchHandler = () => {
    navigate(`/search/${search}`, {state : {search: search}})
  }

  return (
    <form action='' onSubmit={searchHandler} className={styles.search}>
      <input className={styles.searchbar} type='text' onChange={resSearchHandler}/>
      <button className={styles.searchbtn} type='submit'><FaSearch style={{fontSize: "22px"}}/></button>
    </form>
  );
};

export default SearchBar;
