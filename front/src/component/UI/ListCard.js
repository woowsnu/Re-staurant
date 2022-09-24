import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./ListCard.module.css";
import { FaRunning } from "react-icons/fa";
import { FaBookmark, FaRegBookmark, FaStar } from "react-icons/fa";
import NarrowChartBar from "../Restaurant/Chart/NarrowChartBar";

const ListCard = (props) => {
  const [check, setCheck] = useState(false);

  const checkOnClickHandler = () => {
    setCheck(true);
  };

  const ourReview = props.data.reviewList?.filter((el) => el.tag === 0);
  const ourReviewRevisit = ourReview?.filter((el) => el.revisit === 1);
  console.log(ourReview);
  console.log(props.data);
  // console.log(props.data.reviewList[0]);

  return (
    <div className={styles.wrapper}>
      <Link to={`/detail/${props.data.busId}`}>
        <div className={styles.imgsection}>
          <img
            alt="search_result_img"
            className={styles.img}
            src={props.data.reviewList[0].reviewImage}
          />
        </div>
      </Link>
      <div className={styles.description}>
        <div className={styles.firstline}>
          <div className={styles.restaurantName}>
            <span>{props.data.restaurantName}</span>
            &nbsp;&nbsp;
            <span className={styles.rating}>
              <FaStar style={{ color: "#f8d90f", fontSize: "12px" }} />{" "}
              {props.data.avgRating}
            </span>
          </div>
          <label htmlFor="bookmark" className={styles.bookmarkImg}>
            {check ? <FaRegBookmark /> : <FaBookmark />}
          </label>
          <input id="bookmark" type="checkbox" onClick={checkOnClickHandler} />
        </div>
        <div className={styles.revisit}>
          <FaRunning />
          &nbsp;재방문 희망
          <NarrowChartBar
            reviews={ourReviewRevisit.length}
            reviewCount={ourReview.length}
          />
        </div>
        <div className={styles.detail}>{props.data.description}</div>
        <div className={styles.detail2}>
          <div>
            {props.data.siCode} {props.data.guCode} /{" "}
            {props.data.restaurantCategory}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCard;
