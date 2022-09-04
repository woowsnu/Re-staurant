import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "../../api/axios";
import AuthContext from "../../store/auth-context";
import { useContext } from "react";

const URL = "http://localhost:8080/login";

const LogIn = (props) => {
  let navigate = useNavigate();
  const ctx = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
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
    try {
      const response = await axios.post(
        URL,
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      // console.log(response)
      const token = response.data.jwtToken;

      localStorage.setItem("token", token);
      
      ctx.onLogin(email, password);

      navigate(-1);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>로그인</h2>
      <form onSubmit={submitHandler}>
        <label htmlFor="email">아이디</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={emailInputHandler}
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
