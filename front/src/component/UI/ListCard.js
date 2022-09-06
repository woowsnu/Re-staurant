import React, { useState } from "react";
import styles from "./ListCard.module.css";

const ListCard = () => {
  const [check, setCheck] = useState(false);
  const checkOnClickHandler = () => {
    setCheck(true);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.imgsection}>
        <img
          alt="search_result_img"
          className={styles.img}
          src="https://image.toast.com/aaaaaqx/catchtable/shopinfo/s17377/17377_2261409570791374.png"
        />
      </div>
      <div className={styles.description}>
        <div className={styles.bookmark}>
          <label htmlFor="bookmark" className={styles.bookmarkImg}>
            {check ? "💚" : "🤍"}
          </label>
          <input id="bookmark" type="checkbox" onClick={checkOnClickHandler} />
        </div>
        <div>녘 여의도점</div>
        <div>
          녁(Nyug)은 '녘'의 오탈자로 비표준을 바탕으로 생생한 경험을 전하려고
          합니다.{" "}
        </div>
        <div>재방문 희망 98%</div>
        <div>여의도 / 이탈리아 음식</div>
      </div>
    </div>
  );
};

export default ListCard;
