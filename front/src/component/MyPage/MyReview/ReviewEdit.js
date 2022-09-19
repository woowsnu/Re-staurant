import React, { useState } from "react";
import Modal from "../../UI/Modal";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import styles from "./ReviewEdit.module.css";

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

  return (
    <Modal>
      <div className={styles.wrapper}>
        <label htmlFor="editedTitle">한줄평</label>
        <Input id="editedTitle" type="text" value={editedTitle} onChange={titleEditHandler} />
        <br />
        <br />
        <label htmlFor="editedContent">상세리뷰</label><br/>
        <textarea id="editedContent" type="comment" value={editedContent} className={styles.textarea} cols={47} onChange={contentEditHandler}/>
        <div className={styles.buttonArea}>
          <Button style={{ marginRight: "6px" }}>저장하기</Button>
          <Button onClick={reviewEditClose}>닫기</Button>
        </div>
      </div>
    </Modal>
  );
};

export default ReviewEdit;
