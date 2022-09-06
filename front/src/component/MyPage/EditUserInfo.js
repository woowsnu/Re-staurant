import React, { useState, useEffect } from "react";
import Button from "../UI/Button";
import axios from "../../api/axios";
import colors from "../../styles/colors";
import { useNavigate } from "react-router-dom";
import styles from "./EditUserInfo.module.css";
import EditNickname from "./EditUserInfo/EditNickname";
import arrow from "../../images/next.png";

const EditUserInfo = (props) => {
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  const exitEditPage = () => {
    navigate(-1);
  };

  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get("http://localhost:8080/user/auth/userInfo", {
        headers: { "Content-Type": "application/json", Authorization: token },
      })
      .then(function (response) {
        const data = response.data;
        console.log(data);
        setUser(data);
      })
      .catch(function (error) {
        console.log(error + "에러 ㅠㅠ");
      });
  }, [token]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.tabs}>
    <h1>
      내 정보 수정</h1>
      <div className={styles.nicknameEditTab}>
        <button
          onClick={() => {
            navigate("/editnickname", {
              state: {
                email: user.email,
                password: user.password,
                nickname: user.nickname,
              },
            });
          }}
        >
          닉네임 변경
        </button>
        <img alt="arrow" width="20px" src={arrow} />
      </div>
      <div className={styles.passwordEditTab}>
        <button
          onClick={() => {
            navigate("/editpassword");
          }}
        >
          비밀번호 변경
        </button>
        <img alt="arrow" width="20px" src={arrow} />
      </div>
      <div className={styles.withdrawTab}>
        <button>회원탈퇴</button>
        <img alt="arrow" width="20px" src={arrow} />
      </div>
      </div>
    </div>
  );
};

export default EditUserInfo;
