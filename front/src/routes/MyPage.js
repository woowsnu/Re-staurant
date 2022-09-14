import React, { useState, useEffect, useContext } from "react";
import MyEatketList from "../component/MyPage/MyEatketList";
import MyReviews from "../component/MyPage/MyReviews";
import styles from "./MyPage.module.css";
import axios, { instance } from "../api/axios";
import Profile from "../component/MyPage/Profile";
import AuthContext from "../store/auth-context";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const [tabselect, setTabselect] = useState(false);
  const [user, setUser] = useState("");
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

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
     instance
      .get("http://localhost:8080/user/auth/userInfo", {
        headers: { "Content-Type": "application/json", Authorization: token },
      })
      .then((response) => {
        console.log(response);
        const data = response.data;
        setUser(data);
        setDatafetch(true);
      })
      .catch((error) => {
        ctx.onLogout();
        alert("로그인 세션이 만료되었습니다.");
        navigate("/login");
        console.log(error);
      });
  }, [isUpdated]);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setTokenUpdate(!tokenUpdate);
  //   }, 1000 * 5);
  // }, [tokenUpdate]);

  return (
    datafetch && (
      <div className={styles.wrapper}>
        <Profile user={user} updateHandler={() => setIsUpdated(!isUpdated)} />
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
        <div>{tabselect ? <MyEatketList /> : <MyReviews />}</div>
      </div>
    )
  );
};

export default MyPage;
