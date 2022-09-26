import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../api/axios";

import Profile from "../component/MyPage/Profile";
import AuthContext from "../store/auth-context";
import Tabs from "../component/MyPage/Tabs";

import styles from "./MyPage.module.css";

const MyPage = () => {
  const [user, setUser] = useState("");
  const [datafetch, setDatafetch] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  const ctx = useContext(AuthContext);
  const navigate = useNavigate();

  const updateHandler = () => {
    setIsUpdated(!isUpdated);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const profile = { email: localStorage.getItem("email") };

    instance
      .post("/user/auth/userInfo", JSON.stringify(profile), {
        headers: { "Content-Type": "application/json", Authorization: token, },
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


  return (
    datafetch && (
      <div className={styles.wrapper}>
        <Profile user={user} updateHandler={() => setIsUpdated(!isUpdated)} />
        <Tabs user={user} updateHandler={updateHandler} />
      </div>
    )
  );
};

export default MyPage;
