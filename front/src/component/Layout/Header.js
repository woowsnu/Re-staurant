import React from 'react';
import styles from './Header.module.css';
import Navbar from './Navbar';
import SearchBar from '../UI/SearchBar';

const Header = () => {
  return (
    <div className={styles.background}>
      {/* <div className={styles.nav}>
        <Navbar />
      </div> */}
      <div className={styles.subtitle}>가고 또 가고 싶은 인생 맛집 찾기!</div>
      <div className={styles.title}>RE:STAURANT</div>
      <div className={styles.search}>
        <SearchBar />
      </div>
      <div className={styles.bggradient}></div>
    </div>
  );
};

export default Header;
