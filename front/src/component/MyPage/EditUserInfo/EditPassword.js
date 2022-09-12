import React, { useState } from "react";
import styles from "./EditPassword.module.css";
import Input from "../../UI/Input";
import axios from "../../../api/axios";
import Button from "../../UI/Button";

const EditPassword = (props) => {
  const [previousPassword, setPreviousPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordCheck, setNewPasswordCheck] = useState("");
  const [warning, setWarning] = useState("");

  const previousPasswordInput = (e) => {
    e.preventDefault();
    setPreviousPassword(e.target.value);
  };

  const newPasswordInput = (e) => {
    e.preventDefault();
    setNewPassword(e.target.value);
  };

  const newPasswordCheckInput = (e) => {
    e.preventDefault();
    setNewPasswordCheck(e.target.value);
  };

  const exitPasswordChangeMode = () => {
    props.passwordChangeExit();
  };

  const URL = "http://localhost:8080/user/auth/update/password";
  const token = localStorage.getItem("token");
  const handleSubmit = (e) => {
    e.preventDefault();
    const profile = { password: newPassword };
    // if (previousPassword === props.password) {
    axios
      .put(URL, JSON.stringify(profile), {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    // }
    if (previousPassword !== props.password) {
      setWarning("현재 비밀번호를 확인해주세요");
    }
    if (newPassword !== newPasswordCheck) {
      setWarning("비밀번호가 일치하지 않습니다");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div>
        <p className={warning ? styles.warning : styles.offscreen}>{warning}</p>
        <div className={styles.modalTitle}>비밀번호 변경</div>
        <label htmlFor="previousPassword">현재 비밀번호</label>
        <Input
          id="previousPassword"
          type="password"
          value={previousPassword}
          onChange={previousPasswordInput}
        />
        <br />
        <br />
        <label htmlFor="password">변경 비밀번호</label>
        <Input
          id="password"
          type="password"
          value={newPassword}
          onChange={newPasswordInput}
        />
        <br />
        <br />
        <label htmlFor="password">변경 비밀번호 확인</label>
        <Input
          id="password"
          type="password"
          value={newPasswordCheck}
          onChange={newPasswordCheckInput}
        />
      </div>
      <div className={styles.buttonArea}>
        <Button onClick={handleSubmit} style={{"marginRight" : "6px"}}>저장하기</Button>
        <Button onClick={exitPasswordChangeMode}>닫기</Button>
      </div>
    </div>
  );
};

export default EditPassword;