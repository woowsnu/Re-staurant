import React from "react";
import styles from "./RestaurantProfile.module.css";

const RestaurantProfile = (props) => {
  return (
    <div className={styles.container}>
      <img className={styles.resImage} src={props.data.imgUrl} />
      <div className={styles.wrap}>
        <div className={styles.profileWrap}>
          <div>
            <span>{props.data.category}</span>
            <span> / </span>
            <span>{(props.data.address).split(" ", 1) + " " + (props.data.address).split(" ", 2).slice(1, 2)}</span>
            <h1>{props.data.name}</h1>
          </div>
          <div>
            <input type="checkbox" />
            <span>공유하기</span>
          </div>
        </div>
        <div>
          <p>재방문하고 싶어요 (100명의 평가)</p>
          {/* 임시로 range 사용, 그래프 표현 바꾸기 */}
          <input type="range"/>
        </div>
        <div className="restaurant_introduce">
          <h4>매장소개</h4>
          <p>{props.data.description}</p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantProfile;
