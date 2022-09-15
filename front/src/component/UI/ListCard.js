import React, { useState } from "react";
import { Link } from 'react-router-dom';
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
      <Link to={`/detail/${props.data.busId}`}>
      <div className={styles.imgsection}>
        <img
          alt="search_result_img"
          className={styles.img}
        />
      </div>
      </Link>
      <div className={styles.description}>
        <div className={styles.firstline}>
          <div className={styles.restaurantName}>{props.data.restaurantName}</div>
          <label htmlFor="bookmark" className={styles.bookmarkImg}>
            {check ? <FaRegBookmark/> : <FaBookmark/>}
          </label>
          <input id="bookmark" type="checkbox" onClick={checkOnClickHandler} />
        </div>
        <div className={styles.revisit}>
          <FaRunning /> 재방문 희망 98%{" "}
        </div>
        <div className={styles.detail}>{props.data.description}</div>
        <div className={styles.detail2}>
          <div>{props.data.siCode} {props.data.guCode} / {props.data.restaurantCategory}</div>
        </div>
      </div>
    </div>
  );
};

export default ListCard;
