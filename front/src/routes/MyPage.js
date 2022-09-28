import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Profile from "../component/MyPage/Profile";
import AuthContext from "../store/auth-context";
import Tabs from "../component/MyPage/Tabs";

import styles from "./MyPage.module.css";
import Loader from "../component/UI/Loader";
import authAPI from "../api/authAPI";

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
    const profile = { email: localStorage.getItem("email") };
    authAPI.getLoginUserInfo(profile).then((res) => {
      if (res === undefined) {
        ctx.onLogout();
        alert("로그인 세션이 만료되었습니다.");
        navigate("/login");
      }
      else if (res.status === 200) {
        setUser(res.data);
        setDatafetch(true);
      }
    });
  }, [isUpdated]);

  return datafetch ? (
    <div className={styles.wrapper}>
      <Profile user={user} updateHandler={() => setIsUpdated(!isUpdated)} />
      <Tabs user={user} updateHandler={updateHandler} />
    </div>
  ) : (
    <Loader />
  );
};

export default MyPage;
