import React, { useState, useEffect, useContext } from "react";
import MyEatketList from "../component/MyPage/MyEatketList";
import MyReviews from "../component/MyPage/MyReviews";
import styles from "./MyPage.module.css";
import axios from "../api/axios";
import Profile from "../component/MyPage/Profile";
import AuthContext from "../store/auth-context";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const [tabselect, setTabselect] = useState(false);
  const [user, setUser] = useState("");
  // const [tempUser, setTempUser] = useState("");
  // const [restaurant, setRestaurant] = useState("");
  const [datafetch, setDatafetch] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  const ctx = useContext(AuthContext);
  const showReviewsHandler = () => {
    setTabselect();
  };
  const showEatketListHandler = () => {
    setTabselect(true);
  };
  const navigate = useNavigate();

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3500/restaurant")
  //     .then((response) => {
  //       const data = response.data;
  //       setRestaurant(data);
  //     })
  //     .catch((error) => {
  //       console.log(error + "에러 ㅠㅠ");
  //     });
  // }, []);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3500/user")
  //     .then(function (response) {
  //       const data = response.data[0];
  //       setTempUser(data);
  //       setDatafetch(true);
  //     })
  //     .catch(function (error) {
  //       console.log(error + "에러 ㅠㅠ");
  //     });
  // }, []);

  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get("http://localhost:8080/user/auth/userInfo", {
        headers: { "Content-Type": "application/json", Authorization: token },
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        setUser(data);
        setDatafetch(true);
      })
      .catch((error) => {
        ctx.onLogout();
        alert("로그인 세션이 만료되었습니다.")
        navigate("/login")
      });
  }, [isUpdated, token, ctx, navigate]);

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
            <MyEatketList />
          ) : (
            <MyReviews />
          )}
        </div>
      </div>
    )
  );
};

export default MyPage;