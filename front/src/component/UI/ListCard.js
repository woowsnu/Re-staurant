import React, { useState } from "react";
import styles from "./ListCard.module.css";
import { FaRunning } from "react-icons/fa";
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';

const ListCard = (props) => {
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
          src={props.imgLink}
        />
      </div>
      <div className={styles.description}>
        <div className={styles.firstline}>
          <div className={styles.restaurantName}>{props.name}</div>
          <label htmlFor="bookmark" className={styles.bookmarkImg}>
            {check ? <FaRegBookmark/> : <FaBookmark/>}
          </label>
          <input id="bookmark" type="checkbox" onClick={checkOnClickHandler} />
        </div>
        <div className={styles.revisit}>
          <FaRunning /> 재방문 희망 98%{" "}
        </div>
        <div className={styles.detail}>레스토랑 상세설명 삽입예정 </div>
        <div className={styles.detail2}>
          <div>{props.location} / 음식 장르</div>
        </div>
      </div>
    </div>
  );
};

export default ListCard;
