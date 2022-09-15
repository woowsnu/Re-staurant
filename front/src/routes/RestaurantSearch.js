import React, { useState } from "react";
import Input from "../component/UI/Input";
import PhotoCard from "../component/UI/PhotoCard";
import styles from "./RestaurantSearch.module.css";
import ListCard from "../component/UI/ListCard";
import { useLocation, useNavigate } from "react-router-dom";
import { instance } from "../api/axios";
import Navbar from "../component/Layout/Navbar";

const RestaurantSearch = () => {
  const [data, setData] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const RES_URL = `http://localhost:8080/restaurant/${location.state.search}`;
  const CAT_URL = `http://localhost:8080/category/${location.state.search}`;
  instance
    .get(RES_URL)
    .then((res) => {
      const data = res.data[0];
      setData(data)
      console.log(res.data);
    })
    .catch((err) => {
      instance
        .get(CAT_URL)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    });

    const resDetailShow = () => {
      navigate(`detail/${data.busId}`)
    }

  return (
    <div className={styles.wrapper}>
      <Navbar />
      <div className={styles.pagetitle}>
        "{location.state.search}" 검색결과
      </div>
      <Input type="text" id="restaurantsearch" style={{ marginLeft: "20px" }} />
      <br />
      <br />
      <div className={styles.reviewRecommend}>
        "{location.state.search}" 베스트 리뷰 ✨
      </div>
      <div className={styles.photocards}>
        <PhotoCard />
        <PhotoCard />
        <PhotoCard />
        <PhotoCard />
      </div>
      <div className={styles.reviewRecommend}>검색 결과</div>
      <ListCard data={data} onClick={resDetailShow} />
    </div>
  );
};

export default RestaurantSearch;
