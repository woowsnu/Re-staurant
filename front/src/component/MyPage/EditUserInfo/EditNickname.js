import React, { useState } from "react";
import styles from "./EditNickname.module.css";
import Input from "../../UI/Input";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import Button from "../../UI/Button";

const EditNickname = () => {
  const [nickname, setNickname] = useState("");

  const nicknameChangeHandler = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setNickname(e.target.value);
  };

  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state.email;
  const password = location.state.password;

  const token = localStorage.getItem("token");
  const URL = "http://localhost:8080/user/auth/updateUserInfo";
  const nicknameChangeSubmit = (e) => {
    e.preventDefault();
    const profile = { nickname: nickname };
    axios
      .put(URL, JSON.stringify(profile), {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
      .then(function (response) {
        console.log(response);
        setNickname("");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  console.log(location.state);

  return (
    <div className={styles.wrapper}>
      <div className={styles.nicknameedit}>
        <form onSubmit={nicknameChangeSubmit}>
          <h1>닉네임 변경</h1>
          <p>
            변경할 닉네임을 입력해주세요.<br/>
            현재 닉네임 : {location.state.nickname}
          </p>
          <Input
            id="nickname"
            type="text"
            value={nickname}
            onChange={nicknameChangeHandler}
            // style={{width: "100%"}}
          />
        </form>
        <div className={styles.buttonarea}>
          <Button type="submit" onClick={nicknameChangeSubmit}>
            저장하기
          </Button>
          <Button
            onClick={() => {
              navigate(-1);
            }}
          >
            뒤로가기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditNickname;