import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { instance } from "../api/axios";

import FollowProfile from "../component/MyPage/Follow/FollowProfile";
import AuthContext from "../store/auth-context";
import Tabs from "../component/MyPage/Tabs";
import LogIn from "../component/Auth/LogIn";
import styles from "./MyPage.module.css";

const MyPage = () => {
  const [user, setUser] = useState("");
  const [datafetch, setDatafetch] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  const userEmail = useLocation().state;

  let ctx = useContext(AuthContext);

  const updateHandler = () => {
    setIsUpdated(!isUpdated);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const profile = { "email" : userEmail.email }
    instance
      .post("/user/auth/userInfo", JSON.stringify(profile), {
        headers: { "Content-Type": "application/json", Authorization: token },
      })
      .then((response) => {
        const data = response.data;
        setUser(data);
        setDatafetch(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isUpdated]);

  return (
    datafetch && ctx.isLoggedIn ? (
      <div className={styles.wrapper}>
        <FollowProfile user={user} followEmail={userEmail.email} updateHandler={updateHandler} />
        <Tabs user={user} updateHandler={updateHandler} />
      </div>
    ) : <LogIn />
  );
};

export default MyPage;
