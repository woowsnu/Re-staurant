import React, { useState, useEffect } from "react";
import MyEatketList from "../component/MyPage/MyEatketList";
import MyReviews from "../component/MyPage/MyReviews";
import styles from "./MyPage.module.css";
import axios from "../api/axios";
import Profile from "../component/MyPage/Profile";

const MyPage = () => {
  const [tabselect, setTabselect] = useState(false);
  const [tempUser, setTempUser] = useState("");
  const [user, setUser] = useState("");
  const [restaurant, setRestaurant] = useState("");
  const [datafetch, setDatafetch] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  const showReviewsHandler = () => {
    setTabselect();
  };
  const showEatketListHandler = () => {
    setTabselect(true);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3500/restaurant")
      .then(function (response) {
        const data = response.data;
        setRestaurant(data);
      })
      .catch(function (error) {
        console.log(error + "에러 ㅠㅠ");
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3500/user")
      .then(function (response) {
        const data = response.data[0];
        setTempUser(data);
        setDatafetch(true);
      })
      .catch(function (error) {
        console.log(error + "에러 ㅠㅠ");
      });
  }, [isUpdated]);

  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get("http://localhost:8080/user/auth/userInfo", {
        headers: { "Content-Type": "application/json", Authorization: token },
      })
      .then(function (response) {
        const data = response.data;
        console.log(data);
        setUser(data);
        setDatafetch(true);
      })
      .catch(function (error) {
        console.log(error + "에러 ㅠㅠ");
      });
  }, [isUpdated, token]);

  return (
    datafetch && (
      <div className={styles.wrapper}>
        <Profile user={user} updateHandler={() => setIsUpdated(true)} />
        <nav id="mypage_tabmenu" className={styles.tabmenu}>
          <div className={styles.tabbar}>
            <div className={tabselect ? styles.tab : styles.tabactive}>
              <button
                className={tabselect ? styles.tab : styles.tabactive}
                onClick={showReviewsHandler}
              >
                작성 리뷰
              </button>
            </div>
            <div className={tabselect ? styles.tabactive : styles.tab}>
              <button
                className={tabselect ? styles.tabactive : styles.tab}
                onClick={showEatketListHandler}
              >
                먹킷 리스트{" "}
              </button>
            </div>
          </div>
        </nav>
        <div>
          {tabselect ? (
            <MyEatketList restaurantdata={restaurant} />
          ) : (
            <MyReviews userdata={tempUser} />
          )}
        </div>
      </div>
    )
  );
};

export default MyPage;
