import React from "react";
import styles from "./RestaurantTab.module.css";

const RestaurantTab = () => {
  return (
    <div className={styles.wrap}>
      <ul className={styles.tabs}>
        <li>
          <a href="#res-info">식당정보</a>
        </li>
        <li>
          <a href="#res-menu">메뉴정보</a>
        </li>
        <li>
          {/* <a href="#res-reviews">리뷰 ({props.reviewCount})</a> */}
          <a href="#res-reviews">리뷰</a>
        </li>
      </ul>
    </div>
  );
};

export default RestaurantTab;
