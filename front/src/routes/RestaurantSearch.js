import React, { useEffect, useRef, useState } from "react";
import Input from "../component/UI/Input";
import PhotoCard from "../component/UI/PhotoCard";
import styles from "./RestaurantSearch.module.css";
import ListCard from "../component/UI/ListCard";
import { useLocation } from "react-router-dom";
import { instance } from "../api/axios";
import Navbar from "../component/Layout/Navbar";

const RestaurantSearch = () => {
  const [data, setData] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);
  const searchInput = useRef();
  const [search, setSearch] = useState("");
  const [keyword, setKeyword] = useState("");
  const [searchError, setSearchError] = useState(false);

  const location = useLocation();
  
  const searchHandler = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const RES_URL = `http://localhost:8080/restaurant/${location.state.search}`;
  useEffect(() => {
    instance
      .get(RES_URL)
      .then((res) => {
        const data = res.data;
        setData(data);
        setSearchError(false);
      })
      .catch((err) => {
        setSearchError(true);
        console.log(err);
      });
  }, []);

  const objectToData = Object.values(data);

  const searchSubmit = async (e) => {
    e.preventDefault();
    setKeyword(search);
    const RES_URL = `http://localhost:8080/restaurant/${search}`;
    await instance
      .get(RES_URL)
      .then((res) => {
        const data = res.data;
        setData(data);
        setIsUpdated(true);
        setSearchError(false);
      })
      .catch((err) => {
        console.log(err);
        setSearchError(true);
      });
  };
 
  return (
    <div className={styles.wrapper}>
      <Navbar />
      <div className={styles.pagetitle}>
        {isUpdated ? (
          <span>{keyword} 검색결과</span>
        ) : (
          <span>{location.state.search} 검색결과</span>
        )}{" "}
      </div>
      <form onSubmit={searchSubmit}>
        <Input
          type="text"
          id="search"
          ref={searchInput}
          onChange={searchHandler}
          style={{ marginLeft: "20px" }}
        />
        <button type="submit">검색</button>
      </form>
      <br />
      <br />
      <div className={styles.reviewRecommend}>
        {isUpdated ? (
          <span>{keyword} 관련 베스트 리뷰 ✨</span>
        ) : (
          <span>{location.state.search} 관련 베스트 리뷰 ✨</span>
        )}
      </div>
      <div className={styles.photocards}>
        <PhotoCard />
        <PhotoCard />
        <PhotoCard />
        <PhotoCard />
      </div>
      <div className={styles.reviewRecommend}>검색 결과</div>
      {objectToData.map((data) => (
        <ListCard key={data.busId} data={data} />
      ))}
      { searchError ? "검색 결과가 없습니다." : ""}
    </div>
  );
};

export default RestaurantSearch;
