import React from "react";
import Input from "../component/UI/Input";
import PhotoCard from "../component/UI/PhotoCard";
import styles from "./RestaurantSearch.module.css";
import ListCard from "../component/UI/ListCard";

const RestaurantSearch = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.pagetitle}>"여의도 맛집" 검색결과</div>
      <Input type="text" id="restaurantsearch" style={{ marginLeft: "20px" }} />
      <br />
      <br />
      <div className={styles.reviewRecommend}>
      "여의도 맛집" 베스트 리뷰 ✨
      </div>
      <div className={styles.photocards}>
        <PhotoCard />
        <PhotoCard />
        <PhotoCard />
        <PhotoCard />
      </div>
      <div className={styles.reviewRecommend}>
      검색 결과
      </div>
      <ListCard />
      <ListCard />
      <ListCard />
      <ListCard />
      <ListCard />
    </div>
  );
};

export default RestaurantSearch;
