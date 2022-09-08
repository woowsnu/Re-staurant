import React, { useState } from "react";
import styles from "./EditNickname.module.css";
import Input from "../../UI/Input";
import axios from "../../../api/axios";
import Button from "../../UI/Button";

const EditNickname = (props) => {
  const [nickname, setNickname] = useState("");

  const nicknameChangeHandler = (e) => {
    e.preventDefault();
    setNickname(e.target.value);
  };

  const exitNicknameEdit = () => {
    props.nicknameChangeExit();
  };

  const token = localStorage.getItem("token");
  const URL = "http://localhost:8080/user/auth/update/nickname";
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
        props.stateManage();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.nicknameedit}>
        <form onSubmit={nicknameChangeSubmit}>
          <div className={styles.modalTitle}>닉네임 변경</div>
          <p>
            변경할 닉네임을 입력해주세요.
            <br />
            현재 닉네임 : {props.nickname}
          </p>
          <Input
            id="nickname"
            type="text"
            value={nickname}
            onChange={nicknameChangeHandler}
          />
        </form>
        <div className={styles.buttonArea}>
          <Button type="submit" onClick={nicknameChangeSubmit} style={{"margin-right" : "6px"}}>
            저장하기
          </Button>
          <Button
            onClick={() => {
              exitNicknameEdit();
            }}
          >
            닫기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditNickname;
