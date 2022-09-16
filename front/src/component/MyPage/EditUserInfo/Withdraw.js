import React, { useContext, useState } from "react";
import styles from "./Withdraw.module.css";
import Button from "../../UI/Button";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../store/auth-context";
import { instance } from "../../../api/axios";

const Withdraw = (props) => {
  const [withdrawDone, setWithdrawDone] = useState(false);
  const navigate = useNavigate();
  const ctx = useContext(AuthContext);
  const email = props.email;
  console.log(email);

  const exitWithdrawMode = () => {
    props.withdrawExit();
  };

  const URL = "http://localhost:8080/user/auth/deleteUserInfo";
  const token = localStorage.getItem("accessToken");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const profile = { email : email };
    instance
      .delete(URL, JSON.stringify(profile), {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    // await fetch(URL, {
    //   method: "DELETE",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: token,
    //   },
    //   body: JSON.stringify(profile),
    // })
    //   .then((res) => {
    //     console.log(res);
    //     // setWithdrawDone(true);
    //     // ctx.onLogout();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
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
        <Button
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
