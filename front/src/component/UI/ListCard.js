import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./ListCard.module.css";
import { FaRunning } from "react-icons/fa";
import { FaBookmark, FaRegBookmark, FaStar } from "react-icons/fa";
import NarrowChartBar from "../Restaurant/Chart/NarrowChartBar";
import { instance } from "../../api/axios";

const ListCard = (props) => {
  const [resLike, setResLike] = useState([]);

  const ourReview = props.data.reviewList?.filter((el) => el.tag === 1);
  const ourReviewRevisit = ourReview?.filter((el) => el.revisit === 1);

  useEffect(()=>{
    const user = localStorage.getItem("email");
    const token = localStorage.getItem("accessToken");
    instance
      .post("/user/auth/userInfo", JSON.stringify({ email : user}), {
        headers: { "Content-Type": "application/json", Authorization: token, },
      })
      .then((response) => {
        setResLike(response.data.restaurantLikeList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const resLikeCompare = resLike.find(v => v.busId === props.data.busId);
  
  return (
    <div className={styles.wrapper}>
      <Link to={`/detail/${props.data.busId}`}>
        <div className={styles.imgsection}>
          <img
            alt={props.data.restaurantName}
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
            {resLikeCompare === undefined ? <FaRegBookmark /> : <FaBookmark />}
          </label>
        </div>
        {ourReview.length >= 10 ? (
          <div className={styles.revisit}>
            <span>
              <FaRunning />
              &nbsp;재방문 희망
            </span>
            <NarrowChartBar
              reviews={ourReviewRevisit.length}
              reviewCount={ourReview.length}
            />
          </div>
        ) : (
          ""
        )}
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