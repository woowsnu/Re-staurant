import React, { useState } from "react";
import Modal from "../../UI/Modal";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import styles from "./ReviewEdit.module.css";
import { instance } from "../../../api/axios";

const ReviewEdit = (props) => {
  const [editedTitle, setEditedTitle] = useState(props.reviewTitle);
  const [editedContent, setEditedContent] = useState(props.reviewContent);
  const reviewEditClose = () => {
    props.reviewEditClose();
  };
  const titleEditHandler = (e) => {
    setEditedTitle(e.target.value);
  };
  const contentEditHandler = (e) => {
    setEditedContent(e.target.value);
  };
  const updateHandler = () => {
    props.updateHandler();
  };

  const reviewEditSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    const profile = { reviewTitle: editedTitle, reviewContent: editedContent };
    instance
      .put(
        `/review/${props.reviewIndex}/auth/updateReview`,
        JSON.stringify(profile),
        {
          headers: { "Content-Type": "application/json", Authorization: token },
        }
      )
      .then((res) => {
        console.log(res);
        updateHandler();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  return (
    <Modal>
      <div className={styles.wrapper}>
        <form onSubmit={reviewEditSubmit}>
          <label htmlFor="editedTitle">한줄평</label>
          <Input
            id="editedTitle"
            type="text"
            value={editedTitle}
            onChange={titleEditHandler}
          />
          <br />
          <br />
          <label htmlFor="editedContent">상세리뷰</label>
          <br />
          <textarea
            id="editedContent"
            type="comment"
            value={editedContent}
            className={styles.textarea}
            cols={47}
            onChange={contentEditHandler}
          />
          <div className={styles.buttonArea}>
            <Button type="submit" style={{ marginRight: "6px" }}>
              저장하기
            </Button>
            <Button onClick={reviewEditClose}>닫기</Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
export default ReviewEdit;