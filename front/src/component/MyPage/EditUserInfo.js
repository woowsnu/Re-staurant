import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import styles from "./EditUserInfo.module.css";
import { MdArrowForwardIos } from "react-icons/md";

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
        <h1>내 정보 수정</h1>
        <div
          className={styles.nicknameEditTab}
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
          <button>닉네임 변경</button>
          <MdArrowForwardIos />
        </div>
        <div
          className={styles.passwordEditTab}
          onClick={() => {
            navigate("/editpassword");
          }}
        >
          <button>비밀번호 변경</button>
          <MdArrowForwardIos />
        </div>
        <div className={styles.withdrawTab}>
          <button>회원탈퇴</button>
          <MdArrowForwardIos />
        </div>
      </div>
    </div>
  );
};

export default EditUserInfo;
