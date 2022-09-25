import { useState } from "react";
import styles from "./RestaurantSearch.module.css";
import Navbar from "../component/Layout/Navbar";
import Footer from "../component/Layout/Footer";
import SearchInput from "../component/Restaurant/Search/SearchInput";
import SearchResult from "../component/Restaurant/Search/SearchResult";
import SearchResult2 from "../component/Restaurant/Search/SearchResult2";

const RestaurantSearch = () => {
  // const [searchAgain, setSearchAgain] = useState(false);
  const [keyword, setKeyword] = useState("");

  // const searchAgainHandler = () => {
  //   setSearchAgain(true);
  // };
  const resetKeywordHandler = (word) => {
    setKeyword(word);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <Navbar />
        <SearchInput
          // searchAgain={searchAgainHandler}
          resetKeywordHandler={resetKeywordHandler}
        />
        {/* {searchAgain ? (
          <SearchResult2 keyword={keyword} />
        ) : ( */}
          <SearchResult />
        {/* )} */}
        <Footer />
      </div>
    </>
  );
};

export default RestaurantSearch;
