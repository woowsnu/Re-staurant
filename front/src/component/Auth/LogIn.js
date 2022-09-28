import { useNavigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import AuthContext from "../../store/auth-context";
import styles from "./SignUp.module.css";
import Input from "../UI/Input";
import Button from "../UI/Button";
import Logobar from "../Layout/Logobar";
import authAPI from "../../api/authAPI";

const LogIn = () => {
  let navigate = useNavigate();
  const ctx = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [err, setErr] = useState("");

  const emailInputHandler = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const passwordInputHandler = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const profile = { email, password };
    const response = await authAPI.loginUser(profile);
    if (response === undefined) {
      setErr("이메일 혹은 비밀번호를 확인해주세요");
    }
    else if (response.status === 200) {
    const accessToken = response.data.jwtToken;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("email", email);
    ctx.onLogin(email, password);
    navigate(-1);}
  };

  return (
    <>
      <Logobar />
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <div className={styles.pagetitle}>로그인</div>
            <div className={err !== null ? styles.warning : styles.offscreen}>
              {err}
            </div>
            <br />
            <form className={styles.form} onSubmit={submitHandler}>
              <label htmlFor="email">이메일</label>
              <Input
                type="text"
                id="email"
                value={email}
                onChange={emailInputHandler}
                style={{ width: "95%" }}
              />
              <br />
              <br />
              <label htmlFor="password">비밀번호</label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={passwordInputHandler}
                style={{ width: "95%" }}
              />
              <br />
              <br />
              <div className={styles.buttonContents}>
                <Button type="submit">로그인</Button>
              </div>
            </form>
            <div className={styles.loginInfo}>
              아직 회원이 아니신가요? &nbsp;&nbsp;
              <a href="/members">회원가입 하러가기</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;
