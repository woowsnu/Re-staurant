import React, { useState } from "react";
import styles from "./EditProfile.module.css";
import Uploader from "./Uploader";
import axios from "../../api/axios";
import Modal from "../UI/Modal";

const EditProfile = (props) => {
  const [nickname, setNickname] = useState("");

  const nicknameChangeHandler = (e) => {
    e.preventDefault();
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
      <input
        id="nickname"
        type="text"
        value={nickname}
        onChange={nicknameChangeHandler}
      />
      <br/><br/><br/>
      <button type="submit" onClick={saveNewProfileHandler}>저장하기</button>
      <button onClick={closeModal}>닫기</button>
    </Modal>
  );
};

export default EditProfile;
