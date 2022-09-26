import styles from "./RestaurantSearch.module.css";
import Navbar from "../component/Layout/Navbar";
import Footer from "../component/Layout/Footer";
import SearchInput from "../component/Restaurant/Search/SearchInput";
import SearchResult from "../component/Restaurant/Search/SearchResult";

const RestaurantSearch = () => {
  
  return (
    <>
      <div className={styles.wrapper}>
        <Navbar />
        <SearchInput />
        <SearchResult />
        <Footer />
      </div>
    </>
  );
};

export default RestaurantSearch;
