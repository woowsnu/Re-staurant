import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import authAPI from "../api/authAPI";
import FollowProfile from "../component/MyPage/Follow/FollowProfile";
import Tabs from "../component/MyPage/Tabs";
import Loader from "../component/UI/Loader";
import styles from "./MyPage.module.css";

const MyPage = () => {
  const [user, setUser] = useState("");
  const [datafetch, setDatafetch] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  const userEmail = useLocation().state;

  const updateHandler = () => {
    setIsUpdated(!isUpdated);
  };

  useEffect(() => {
    const profile = { "email" : userEmail.email }
    authAPI.getLoginUserInfo(profile).then((res) => {
      setUser(res.data);
      setDatafetch(true);
    })
  }, [isUpdated]);

  return (
    datafetch ? (
      <div className={styles.wrapper}>
        <FollowProfile user={user} followEmail={userEmail.email} updateHandler={updateHandler} />
        <Tabs user={user} updateHandler={updateHandler} />
      </div>
    ) : <Loader />
  );
};

export default MyPage;
