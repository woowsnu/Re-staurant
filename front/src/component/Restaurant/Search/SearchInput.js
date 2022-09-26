import React, { useState, useRef } from "react";
import styles from "./SearchInput.module.css";
import Input from "../../UI/Input";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

const SearchInput = () => {
  const searchInput = useRef();
  const [search, setSearch] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);

  let navigate = useNavigate();
  const name = useParams().id;

  const searchHandler = (e) => {
    setSearch(e.target.value);
  };
  
  const searchSubmit = (e) => {
    e.preventDefault();
    setIsUpdated(true);
    setSearchWord(search);
    navigate(`/search/${search}`)
  };

  return (
    <div>
      <div className={styles.pagetitle}>
        {isUpdated ? (
          <span>{searchWord} 검색결과</span>
        ) : (
          <span>{name} 검색결과</span>
        )}
      </div>
      <form onSubmit={searchSubmit} className={styles.search}>
        <Input
          type="text"
          id="search"
          ref={searchInput}
          onChange={searchHandler}
          style={{ marginLeft: "2rem" }}
        />
        <button type="submit" className={styles.searchbtn}>
          <FaSearch style={{ fontSize: "22px" }} />
        </button>
      </form>
      <br />
      <br />
    </div>
  );
};

export default SearchInput;