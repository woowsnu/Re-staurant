import React from "react";
import Button from "../../UI/Button";
import Modal from "../../UI/Modal";
import styles from "./ReviewDelete.module.css";
import { instance } from "../../../api/axios";

const ReviewDelete = (props) => {
  const reviewDeleteClose = () => {
    props.reviewDeleteClose();
  };

  const updateHandler = () => {
    props.updateHandler();
  };

  const reviewDeleteHandler = async () => {
    const token = localStorage.getItem("accessToken");
    await instance
      .delete(`/api/auth/deleteReview?reviewIndex=${props.reviewIndex}`, {
        headers: { Authorization: token, "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(res);
        alert("리뷰가 삭제됐습니다")
        updateHandler();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Modal>
      <div className={styles.wrapper}>
        리뷰 삭제 후 내용 복구가 불가능 합니다. <br />
        정말 삭제하시겠습니까 ?
        <div className={styles.buttonArea}>
          <Button onClick={reviewDeleteHandler} style={{ marginRight: "6px" }}>
            삭제하기
          </Button>
          <Button onClick={reviewDeleteClose}>닫기</Button>
        </div>
      </div>
    </Modal>
  );
};

export default ReviewDelete;