import React, { useState } from 'react';
import styles from './RestaurantTab.module.css';

const RestaurantTab = (props) => {
  const [currentTab, setCurrentTab] = useState(0);

  const tabHandler = (index) => {
    setCurrentTab(index);
  };

  return (
      <ul className={styles.tabsWrap}>
        <li onClick={()=>tabHandler(0)} className={currentTab === 0 ? styles.tabsClicked : styles.tab}>
          <a href='#res-info'>식당정보</a>
        </li>
        <li onClick={()=>tabHandler(1)} className={currentTab === 1 ? styles.tabsClicked : styles.tab}>
          <a href='#res-menu'>메뉴정보</a>
        </li>
        <li onClick={()=>tabHandler(2)} className={currentTab === 2 ? styles.tabsClicked : styles.tab}>
        <a href='#res-reviews'>리뷰 ({props.reviewCount})</a>
        </li>
      </ul>
  );
};

export default RestaurantTab;
