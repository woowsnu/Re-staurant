import React, { useState, useEffect, useContext } from "react";
import MyEatketList from "../component/MyPage/MyEatketList";
import MyReviews from "../component/MyPage/MyReviews";
import styles from "./MyPage.module.css";
import axios from "../api/axios";
import Profile from "../component/MyPage/Profile";

const MyPage = () => {
  const [tabselect, setTabselect] = useState(false);
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
        setUser(data);
        setDatafetch(true);
      })
      .catch(function (error) {
        console.log(error + "에러 ㅠㅠ");
      });
  }, [isUpdated]);

  return (
    datafetch && (
      <>
        <Profile user={user} updateHandler={() => setIsUpdated(true)} />
        <div id="mypage_tabmenu" className={styles.tabmenu}>
          <ul className={styles.tabbar}>
            <li onClick={showReviewsHandler}>작성 리뷰</li>
            <li onClick={showEatketListHandler}>먹킷 리스트 </li>
          </ul>
        </div>
        <div>
          {tabselect ? (
            <MyEatketList restaurantdata={restaurant} />
          ) : (
            <MyReviews userdata={user} />
          )}
        </div>
      </>
    )
  );
};

export default MyPage;
