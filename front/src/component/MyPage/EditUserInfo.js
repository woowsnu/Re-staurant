import React, { useState } from "react";
import Button from "../UI/Button";
import axios from "../../api/axios";
import colors from "../../styles/colors"
import Input from "../UI/Input";
import { useLocation, useNavigate } from "react-router-dom";

const EditUserInfo = (props) => {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const nicknameChangeHandler = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setNickname(e.target.value);
  };

  const exitEditPage = () => {
    navigate(-1);
  };

  const token = localStorage.getItem("token");
  const URL = "http://localhost:8080/user/auth/updateUserInfo"
  const saveNewProfileHandler = (e) => {
    e.preventDefault();
    const profile = { nickname: nickname };
    axios
      .put(
        URL,
        JSON.stringify(profile),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          }
        },
      ).then(function (response) {
        setNickname("")
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div>
      <br/><br/>
      <label htmlFor="nickname">닉네임</label>
      <Input
        id="nickname"
        type="text"
        value={nickname}
        onChange={nicknameChangeHandler}
      />
      <br/><br/><br/>
      <Button style={{backgroundColor : `${colors.primary2}`}} type="submit" onClick={saveNewProfileHandler}>저장하기</Button>
      <Button style={{backgroundColor : `${colors.primary2}`}} onClick={exitEditPage}>뒤로 가기</Button>
    </div>
  );
};

export default EditUserInfo;