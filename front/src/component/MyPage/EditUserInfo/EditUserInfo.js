import React, { useState } from "react";
import styles from "./EditUserInfo.module.css";
import { MdArrowForwardIos } from "react-icons/md";
import Modal from "../../UI/Modal";
import { BiArrowBack } from "react-icons/bi";
import EditNickname from "./EditNickname";
import EditPassword from "./EditPassword";
import Withdraw from "./Withdraw";

const EditUserInfo = (props) => {
  const [nicknameEdit, setNicknameEdit] = useState(false);
  const [passwordEdit, setPasswordEdit] = useState(false);
  const [withdraw, setWithdraw] = useState(false);
  const [hideTabs, setHideTabs] = useState(false);

  const exitEditPage = () => {
    props.closeModal();
  };

  const nicknameChangeHandler = () => {
    setNicknameEdit(true);
    setHideTabs(true);
  };

  const exitNicknameChangeMode = () => {
    setNicknameEdit(false);
    setHideTabs(false);
  };

  const passwordChangeHandler = () => {
    setPasswordEdit(true);
    setHideTabs(true);
  };

  const exitPasswordChangeMode = () => {
    setPasswordEdit(false);
    setHideTabs(false);
  };

  const withdrawHandler = () => {
    setWithdraw(true);
    setHideTabs(true);
  };

  const exitWithdrawMode = () => {
    setWithdraw(false);
    setHideTabs(false);
  };

  const stateManage = () => {
    props.stateManage();
  };

  return (
    <Modal>
      <div className={styles.tabs}>
        <h1>
          <BiArrowBack onClick={exitEditPage} />
          &nbsp;&nbsp;내 정보 수정
        </h1>
        <div
          className={hideTabs ? styles.hideTabs : styles.nicknameEditTab}
          onClick={nicknameChangeHandler}
        >
          닉네임 변경
          <MdArrowForwardIos />
        </div>
        {nicknameEdit ? (
          <EditNickname
            stateManage={() => {
              stateManage();
            }}
            nicknameChangeExit={() => {
              exitNicknameChangeMode();
            }}
            nickname={props.nickname}
          />
        ) : (
          ""
        )}
        <div
          className={hideTabs ? styles.hideTabs : styles.passwordEditTab}
          onClick={passwordChangeHandler}
        >
          비밀번호 변경
          <MdArrowForwardIos />
        </div>
        {passwordEdit ? (
          <EditPassword
            passwordChangeExit={() => {
              exitPasswordChangeMode();
            }}
            password={props.password}
          />
        ) : (
          ""
        )}
        <div
          className={hideTabs ? styles.hideTabs : styles.withdrawTab}
          onClick={withdrawHandler}
        >
          회원탈퇴
          <MdArrowForwardIos />
        </div>
        {withdraw ? (
          <Withdraw
            email={props.email}
            password={props.password}
            withdrawExit={() => {
              exitWithdrawMode();
            }}
          />
        ) : (
          ""
        )}
      </div>
    </Modal>
  );
};

export default EditUserInfo;
