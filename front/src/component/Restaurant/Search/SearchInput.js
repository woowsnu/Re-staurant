import React, { useState, useRef } from "react";
import styles from "./SearchInput.module.css";
import Input from "../../UI/Input";
import { FaSearch } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const SearchInput = (props) => {
  const searchInput = useRef();
  const [search, setSearch] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);

  let location = useLocation();

  const searchHandler = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };
  
  const searchSubmit = (e) => {
    e.preventDefault();
    // props.searchAgain();
    setIsUpdated(true);
    setSearchWord(search);
    props.resetKeywordHandler(search);
  };

  return (
    <div>
      <div className={styles.pagetitle}>
        {isUpdated ? (
          <span>{searchWord} 검색결과</span>
        ) : (
          <span>{location.state.search} 검색결과</span>
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
