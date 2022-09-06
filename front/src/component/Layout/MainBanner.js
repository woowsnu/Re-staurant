import React from 'react';
import SearchBar from '../UI/SearchBar';
import styles from './MainBanner.module.css';

const MainBanner = () => {
  return (
    <div className={styles.background}>
      <div className={styles.title}>가고 또 가고 싶은 인생 맛집 찾기! RE:STAURANT</div>
      <SearchBar />
    </div>
  );
};

export default MainBanner;
