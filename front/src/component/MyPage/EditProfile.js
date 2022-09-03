import React, { useState } from "react";
import styles from "./EditProfile.module.css";
import Button from "../UI/Button";
import Uploader from "./Uploader";
import axios from "../../api/axios";
import Modal from "../UI/Modal";
import colors from "../../styles/colors"
import Input from "../UI/Input";

const EditProfile = (props) => {
  const [nickname, setNickname] = useState("");

  const nicknameChangeHandler = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setNickname(e.target.value);
  };

  const closeModal = () => {
    props.closeModal();
  };

  const stateManage = () => {
    props.stateManage();
  }

  const token = localStorage.getItem("token")
  const id = props.id;
  const URL = "http://localhost:3500/user"
  const saveNewProfileHandler = (e) => {
    e.preventDefault();
    const profile = { id, name: nickname };
    axios
      .patch(
        `${URL}/${id}`,
        JSON.stringify(profile),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          }
        },
      ).then(function (response) {
        setNickname("")
        stateManage();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <Modal>
      <Uploader/>
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
      <Button style={{backgroundColor : `${colors.primary2}`}} onClick={closeModal}>닫기</Button>
    </Modal>
  );
};

export default EditProfile;
