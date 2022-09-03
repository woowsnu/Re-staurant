import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import AuthContext from "../../store/auth-context";
import styles from "./SignUp.module.css";
import { useContext } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import colors from "../../styles/colors";

// const USERNAME_REGEX = /^[A-z0-9].{5,23}$/;
const EMAIL_REGEX = /^[A-z0-9-_]+@[A-z0-9-_.].{1,23}$/;
const PASSWORD_REGEX = /^.{8,}$/;
const URL = "http://localhost:8080/join";

const SignUp = () => {
  const ctx = useContext(AuthContext);

  const [username, setUsername] = useState("");
  // const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [passwordCheck, setPasswordCheck] = useState("");
  const [validPasswordCheck, setValidPasswordCheck] = useState(false);
  const [passwordCheckFocus, setPasswordCheckFocus] = useState(false);

  const [signupsuccess, setSignupsuccess] = useState(false);

  // useEffect(() => {
  //   setValidUsername(USERNAME_REGEX.test(username));
  // }, [username]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPassword(PASSWORD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    setValidPasswordCheck(password === passwordCheck);
  }, [password, passwordCheck]);

  const usernameInputHandler = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
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
    try {
      const response = axios.post(
        URL,
        JSON.stringify({ username, email, password }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }

    setUsername("");
    setEmail("");
    setPassword("");
    setPasswordCheck("");
    setSignupsuccess(true);
  };

  return signupsuccess ? (
    <div>
      회원가입 성공!
      <a href="/login">로그인 하러가기</a>
    </div>
  ) : (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.pagetitle}>회원가입</div>
        <form>
          <label htmlFor="username">닉네임</label>
          <Input
            type="text"
            id="username"
            value={username}
            onFocus={() => setUsernameFocus(true)}
            onChange={usernameInputHandler}
          />
          {/* <p
            className={
              !validUsername && usernameFocus
                ? styles.warning
                : styles.offscreen
            }
          >
            아이디는 영문, 숫자 혼합하여 생성이 가능합니다. <br />
            아이디는 최소 5글자 이상이 되어야합니다.
          </p> */}
          <br />
          <br />
          <label htmlFor="email">이메일</label>
          <Input
            type="text"
            id="email"
            value={email}
            onFocus={() => setEmailFocus(true)}
            onChange={emailInputHandler}
          />
          <br />
          <p
            className={
              !validEmail && emailFocus ? styles.warning : styles.offscreen
            }
          >
            이메일 형식으로 입력해주세요<br/>        
            (예. name@domain.com)
          </p>
          <br />
          <label htmlFor="password">비밀번호</label>
          <Input
            type="password"
            id="password"
            value={password}
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
          <div className={styles.buttoncontents}>
          <Button
            type="submit"
            style={{ backgroundColor: `${colors.primary2}`, width: "100%" }}
            onClick={submitHandler}
          >
            회원가입
          </Button>
          </div>
        </form>
        <br />
        <br />
        <div>
          이미 회원이신가요? <br />
          <a href="/login">로그인 하러가기</a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
