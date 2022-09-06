import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "../../api/axios";
import AuthContext from "../../store/auth-context";
import { useContext } from "react";
import styles from "./SignUp.module.css";
import Input from "../UI/Input";
import Button from "../UI/Button";
import colors from "../../styles/colors";

const URL = "http://localhost:8080/login";

const LogIn = (props) => {
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
    await axios
      .post(URL, JSON.stringify({ email, password }), {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        const token = response.data.jwtToken;
        localStorage.setItem("token", token);
        ctx.onLogin(email, password);
        navigate(-1);
      })
      .catch((err) => {
        console.log(err);
        const errCode = err.response.status;
        if (errCode === 401) {
          setErr("이메일 혹은 비밀번호를 확인해주세요");
        }
      });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.pagetitle}>로그인</div>
        <div className={err !== null ? styles.warning : styles.offscreen}>
          {err}
        </div>
        <br />
        <form className={styles.form} onSubmit={submitHandler}>
          <label htmlFor="email">아이디</label>
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
          <div className={styles.buttoncontents}>
          <Button
            type="submit"
            style={{ backgroundColor: `${colors.primary2}`, width: "100%" }}
          >
            로그인
          </Button>
          </div>
        </form>
        <div className={styles.logininfo}>
          아직 회원이 아니신가요? <br />
          <a href="/members">회원가입 하러가기</a>
          <br />
          <br />
          이메일/비밀번호를 잃어버리셨나요? <br />
          <a href="/find">계정정보 찾기</a>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
