import React, { useState } from "react";
import styles from "./Withdraw.module.css";
import Button from "../../UI/Button";
import { useNavigate } from "react-router-dom";

const Withdraw = (props) => {
  const [withdrawDone, setWithdrawDone] = useState(false);
  const navigate = useNavigate();
  const email = props.email;

  const exitWithdrawMode = () => {
    props.withdrawExit();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    const profile = { email : email };
    
    await fetch("http://spring-app:8080/user/auth/deleteUserInfo", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        credentials : "same-origin"
      },
      body: JSON.stringify(profile),
    })
      .then((res) => {
        console.log(res);
        setWithdrawDone(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.modalTitle}>회원탈퇴</div>
      <div className={withdrawDone ? styles.offscreen : styles.show}>
        회원탈퇴 직후 리뷰 등 계정 내 모든 정보가 사라집니다. <br />
        회원 탈퇴 전에 꼭 신중하게 생각해주세요 !
      </div>
      <div className={withdrawDone ? styles.show : styles.offscreen}>
        떠나신다니 아쉬워요 😢 <br />또 다시 RE:STRAUNT에서 만날 수 있기를 !
      </div>
      <div className={withdrawDone ? styles.offscreen : styles.buttonArea}>
        <Button onClick={handleSubmit} style={{ marginRight: "6px" }}>
          탈퇴하기
        </Button>
        <Button onClick={exitWithdrawMode}>취소</Button>
      </div>
      <div className={withdrawDone ? styles.buttonArea : styles.offscreen}>
        <Button style={{ width : "100%"}}
          onClick={() => {
            navigate("/");
          }}
        >
          닫기
        </Button>
      </div>
    </div>
  );
};

export default Withdraw;
