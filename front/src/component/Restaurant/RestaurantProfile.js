import React from "react";
import ChartBar from "./Chart/ChartBar";
import styles from "./RestaurantProfile.module.css";

const RestaurantProfile = (props) => {
  return (
    <div className={styles.container}>
      <img className={styles.resImage} src={props.restaurant.imgUrl} alt={props.restaurant.name}/>
      <div className={styles.wrap}>
        <div className={styles.profileWrap}>
          <div>
            <span>{props.restaurant.category}</span>
            <span> / </span>
            <span>{props.simpleAddress}</span>
            <h1>{props.restaurant.name}</h1>
          </div>
          <div>
            <input type="checkbox" />
            <span>공유하기</span>
          </div>
        </div>
        <div>
          <p>재방문하고 싶어요 ({props.reviews.length}명의 리뷰)</p>
          <ChartBar reviews={props.reviews}/>
        </div>
        <div className="restaurant_introduce">
          <h4>매장소개</h4>
          <p>{props.restaurant.description}</p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantProfile;
