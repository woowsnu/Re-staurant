import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import { instance } from "../../api/axios";
import styles from "./SignUp.module.css";
import Input from "../UI/Input";
import Button from "../UI/Button";
import Welcome from "./Welcome";

const EMAIL_REGEX = /^[A-z0-9-_]+@[A-z0-9-_.].{1,23}$/;
const PASSWORD_REGEX = /^.{8,}$/;
const URL = "http://localhost:8080/user/join";

const SignUp = () => {
  const [nickname, setNickname] = useState("");

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [passwordCheck, setPasswordCheck] = useState("");
  const [validPasswordCheck, setValidPasswordCheck] = useState(false);
  const [passwordCheckFocus, setPasswordCheckFocus] = useState(false);

  const [err, setErr] = useState("");
  const [signupsuccess, setSignupsuccess] = useState(false);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPassword(PASSWORD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    setValidPasswordCheck(password === passwordCheck);
  }, [password, passwordCheck]);

  const nicknameInputHandler = (e) => {
    e.preventDefault();
    setNickname(e.target.value);
  };

  const emailInputHandler = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const passwordInputHandler = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const passwordCheckInputHandler = (e) => {
    e.preventDefault();
    setPasswordCheck(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    instance
      .post(URL, JSON.stringify({ nickname, email, password }), {
        headers: { "Content-Type": "application/json" },
      })
      .then(function (response) {
        console.log(response);
        setNickname("");
        setEmail("");
        setPassword("");
        setPasswordCheck("");
        setSignupsuccess(true);
      })
      .catch(function (err) {
        console.log(err.response.status);
        const errCode = err.response.status;
        if (errCode === 400) {
          setErr("이미 존재하는 계정입니다.");
        }
      });
  };
  console.log(err);

  return signupsuccess ? (
    <Welcome />
  ) : (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.pagetitle}>회원가입</div>
        <div className={err !== null ? styles.warning : styles.offscreen}>
          {err}
        </div>
        <br />
        <form className={styles.form} onSubmit={submitHandler}>
          <label htmlFor="nickname">닉네임</label>
          <Input
            type="text"
            id="nickname"
            value={nickname}
            style={{ width: "95%" }}
            onChange={nicknameInputHandler}
          />
          <br />
          <br />
          <label htmlFor="email">이메일</label>
          <Input
            type="text"
            id="email"
            value={email}
            style={{ width: "95%" }}
            onFocus={() => setEmailFocus(true)}
            onChange={emailInputHandler}
          />
          <br />
          <p
            className={
              !validEmail && emailFocus ? styles.warning : styles.offscreen
            }
          >
            이메일 형식으로 입력해주세요
            <br />
            (예. name@domain.com)
          </p>
          <br />
          <label htmlFor="password">비밀번호</label>
          <Input
            type="password"
            id="password"
            value={password}
            style={{ width: "95%" }}
            onFocus={() => setPasswordFocus(true)}
            onChange={passwordInputHandler}
          />
          <br />
          <p
            className={
              !validPassword && passwordFocus
                ? styles.warning
                : styles.offscreen
            }
          >
            8자리 이상으로 설정해주세요.
          </p>
          <br />
          <label htmlFor="passwordCheck">비밀번호 확인</label>
          <Input
            type="password"
            id="passwordCheck"
            value={passwordCheck}
            style={{ width: "95%" }}
            onFocus={() => setPasswordCheckFocus(true)}
            onChange={passwordCheckInputHandler}
          />
          <br />
          <p
            className={
              !validPasswordCheck && passwordCheckFocus
                ? styles.warning
                : styles.offscreen
            }
          >
            비밀번호가 일치하지 않습니다.
          </p>
          <br />
          <div className={styles.buttonContents}>
            <Button
              type="submit"
            >
              회원가입
            </Button>
          </div>
        </form>
        <div className={styles.toLogin}>
          이미 회원이신가요?&nbsp;&nbsp;
          <a href="/login">로그인 하러가기 </a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
