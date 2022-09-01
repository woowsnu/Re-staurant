import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "../../api/axios";
import Button from "../UI/Button";

const URL = "http://localhost:8080/login";

const LogIn = () => {
  let navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const usernameInputHandler = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  };

  const passwordInputHandler = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        URL,
        JSON.stringify({ username, password }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(response.headers.authorization);
      const token = response.headers.authorization;
      localStorage.setItem("token", token);
      navigate(-1)
    } catch (err) {
      console.log(err);
    }
  };

  const token = localStorage.getItem("token")

  return (
    <div>
      <h2>로그인</h2>
      <form onSubmit={submitHandler}>
        <label htmlFor="username">아이디</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={usernameInputHandler}
        />
        <br />
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={passwordInputHandler}
        />
        <br />
        <button type="submit">로그인</button>
      </form>
      <div>
        아직 회원이 아니신가요? <br />
        <a href="/members">회원가입 하러가기</a>
        이메일/비밀번호를 잃어버리셨나요? <br />
        <a href="/find">계정정보 찾기</a>
      </div>
    </div>
  )
};

export default LogIn;
