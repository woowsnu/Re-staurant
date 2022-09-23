import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { instance } from "../api/axios";
import RestaurantSearchNoResult from "../component/Restaurant/RestaurantSearchNoResult";
import Input from "../component/UI/Input";
import PhotoCard from "../component/UI/PhotoCard";
import styles from "./RestaurantSearch.module.css";
import ListCard from "../component/UI/ListCard";
import Navbar from "../component/Layout/Navbar";
import { FaSearch } from "react-icons/fa";
import Footer from "../component/Layout/Footer";
import Pagination from "../component/UI/Pagination";

const RestaurantSearch = () => {
  const [data, setData] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);
  const searchInput = useRef();
  const [search, setSearch] = useState("");
  const [keyword, setKeyword] = useState("");
  const [searchError, setSearchError] = useState(false);
  const [dataFetch, setDataFetch] = useState(false);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * 7;

  const location = useLocation();

  const searchHandler = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  useEffect(() => {
    instance
      .get(`restaurant/${location.state.search}`)
      .then((res) => {
        const data = res.data;
        setData(data);
        setDataFetch(true);
        setSearchError(false);
      })
      .catch((err) => {
        setSearchError(true);
        console.log(err);
      });
  }, []);

  useEffect(() => {
    instance
      .get(`restaurant/search?restaurantCategory=${location.state.search}`)
      .then((res) => {
        const data = res.data;
        setData(data);
        setDataFetch(true);
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
    setIsUpdated(true);
    await instance
      .get(`restaurant/search?restaurantCategory=${search}`)
      .then((res) => {
        const data = res.data;
        setData(data);
        setDataFetch(true);
        setSearchError(false);
      })
      .catch((err) => {
        setKeyword(search);
        instance
          .get(`/restaurant/${search}`)
          .then((res) => {
            const data = res.data;
            setData(data);
            setIsUpdated(true);
            setDataFetch(true);
            setSearchError(false);
          })
          .catch((err) => {
            setKeyword(search);
            console.log(err);
            setSearchError(true);
          });
      });
  };

  return (
    <>
      {dataFetch ? (
        <div className={styles.wrapper}>
          <Navbar />
          <div className={styles.pagetitle}>
            {isUpdated ? (
              <span>{keyword} 검색결과</span>
            ) : (
              <span>{location.state.search} 검색결과</span>
            )}{" "}
          </div>
          <form onSubmit={searchSubmit} className={styles.search}>
            <Input
              type="text"
              id="search"
              ref={searchInput}
              onChange={searchHandler}
              style={{ marginLeft: "2rem" }}
            />
            <button type="submit" className={styles.searchbtn}>
              <FaSearch style={{ fontSize: "22px" }} />
            </button>
          </form>
          <br />
          <br />
          {searchError ? (
            <RestaurantSearchNoResult />
          ) : (
            <div>
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
              <br />
              <div className={styles.reviewRecommend}>검색 결과 🔎</div>
              <div>
                {objectToData.slice(offset, offset + 7).map((data) => (
                  <>
                    <ListCard key={data.busId} data={data} />
                    <div className={styles.linebreak}>{""}</div>
                  </>
                ))}
              </div>
              <Pagination
                total={objectToData.length}
                page={page}
                setPage={setPage}
              />
            </div>
          )}
          <Footer />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default RestaurantSearch;
