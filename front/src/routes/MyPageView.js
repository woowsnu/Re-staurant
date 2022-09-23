import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { instance } from "../api/axios";

import FollowProfile from "../component/MyPage/Follow/FollowProfile";
import AuthContext from "../store/auth-context";
import Tabs from "../component/MyPage/Tabs";

import styles from "./MyPage.module.css";

const MyPage = () => {
  const [user, setUser] = useState("");
  const [datafetch, setDatafetch] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  const ctx = useContext(AuthContext);
  const navigate = useNavigate();

  const userEmail = useLocation().state;
  console.log(userEmail.email)

  const updateHandler = () => {
    setIsUpdated(!isUpdated);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const profile = { "email" : userEmail.email }
    console.log(profile)
    instance
      .post("/user/auth/userInfo", JSON.stringify(profile), {
        headers: { "Content-Type": "application/json", Authorization: token },
      })
      .then((response) => {
        console.log(response);
        const data = response.data;
        setUser(data);
        setDatafetch(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isUpdated]);

  return (
    datafetch && (
      <div className={styles.wrapper}>
        <FollowProfile user={user} followEmail={userEmail.email} updateHandler={() => setIsUpdated(!isUpdated)} />
        <Tabs user={user} updateHandler={updateHandler} />
      </div>
    )
  );
};

export default MyPage;
