import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import styles from "./Welcome.module.css";

const Welcome = () => {
  let navigate = useNavigate();
  const navigateHome = () => {
    navigate("/");
  };
  const navigateLogin = () => {
    navigate("/login");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.instruction}>
          <div className={styles.instructiontitle}>
          회원가입 성공!
          </div>
          RE:STAURANT의 회원이 되신 것을 환영합니다.
        </div>
        <div className={styles.buttons}>
          <Button onClick={navigateLogin}>로그인</Button>
          &nbsp;&nbsp;
          <Button onClick={navigateHome}>홈으로</Button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
