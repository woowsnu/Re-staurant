import React from "react";
import Button from "../../UI/Button";
import Uploader from "./Uploader";
import Modal from "../../UI/Modal";

const UploadProfilePic = (props) => {
 
  const closeModal = () => {
    props.closeModal();
  };

  // const stateManage = () => {
  //   props.stateManage();
  // }

  return (
    <Modal>
      <Uploader/>
      <br/><br/>
      <Button type="submit">저장하기</Button>
      <Button onClick={closeModal}>닫기</Button>
    </Modal>
  );
};

export default UploadProfilePic;