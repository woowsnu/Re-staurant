import React, { useState } from "react";
import axios from "../../../api/axios";
import styles from "./Withdraw.module.css";
import Input from "../../UI/Input";
import Button from "../../UI/Button";

const Withdraw = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailInput = (e) => {
    setEmail(e.target.value);
  };

  const passwordInput = (e) => {
    setPassword(e.target.value);
  };

  const exitWithdrawMode = () => {
    props.withdrawExit();
  };

  const URL = "http://localhost:8080/user/auth/deleteUserInfo";
  const token = localStorage.getItem("token");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const profile = { email: email };
    // await axios
    //   .delete(URL, JSON.stringify(profile), {
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Authorization": token,
    //     },
    //   })
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    
    fetch(URL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(profile),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.modalTitle}>회원탈퇴</div>
      <label htmlFor="email">이메일</label>
      <Input id="email" type="text" value={email} onChange={emailInput} />
      <br />
      <br />
      <label htmlFor="password">비밀번호</label>
      <Input
        id="password"
        type="password"
        value={password}
        onChange={passwordInput}
      />
      <div className={styles.buttonArea}>
        <Button onClick={handleSubmit} style={{ marginRight: "6px" }}>
          저장하기
        </Button>
        <Button onClick={exitWithdrawMode}>취소</Button>
      </div>
    </div>
  );
};

export default Withdraw;
