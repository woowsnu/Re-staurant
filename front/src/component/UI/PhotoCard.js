import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./PhotoCard.module.css";

const PhotoCard = (props) => {
  const [check, setCheck] = useState(false);
  const checktest = () => {
    setCheck(!check);
  };
  return (
    <div className={styles.container}>
      <div className={styles.imgwrapper}>
        <Link to={`/detail/${props.resId}`}>
          <p>"가성비가 좋고 분위기가 좋았어요"</p>
          <div className={styles.bggradient}></div>
        </Link>
      </div>
      <div className={styles.infowrapper}>
        <div className={styles.resInfo}>
          <Link to={`/detail/${props.resId}`}>
            <h3>식당 이름</h3>
            <h4>재방문 희망 72%</h4>
            <p>한식 / 여의도</p>
          </Link>
        </div>
        <div className={styles.bookmark}>
          <label htmlFor="bookmark" className={styles.bookmarkImg}>
            {check ? "💚" : "🤍" }
          </label>
          <input id="bookmark" type="checkbox" onClick={checktest} />
        </div>
      </div>
    </div>
  );
};

export default PhotoCard;

// background-image: url(${(props) => props.bgImg});
