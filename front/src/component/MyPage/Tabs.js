import React, { useState } from "react";
import styles from "./Tabs.module.css";
import MyEatketList from "./MyEatketList";
import MyReviews from "./MyReviews";

const Tabs = () => {
    const [tabselect, setTabselect] = useState(false);

    const showReviewsHandler = () => {
        setTabselect();
      };
      const showEatketListHandler = () => {
        setTabselect(true);
      };

  return (
    <div>
      <nav id="mypage_tabmenu" className={styles.tabmenu}>
        <div className={styles.tabbar}>
          <div className={tabselect ? styles.tab : styles.tabactive}>
            <button
              className={tabselect ? styles.tab : styles.tabactive}
              onClick={showReviewsHandler}
            >
              작성 리뷰
            </button>
          </div>
          <div className={tabselect ? styles.tabactive : styles.tab}>
            <button
              className={tabselect ? styles.tabactive : styles.tab}
              onClick={showEatketListHandler}
            >
              먹킷 리스트{" "}
            </button>
          </div>
        </div>
      </nav>
      <div>{tabselect ? <MyEatketList /> : <MyReviews />}</div>
    </div>
  );
};

export default Tabs;
