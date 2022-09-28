import React, { useState } from "react";
import Modal from "../../UI/Modal";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import styles from "./ReviewEdit.module.css";
import { instance } from "../../../api/axios";

const ReviewEdit = (props) => {
  const [editedTitle, setEditedTitle] = useState(props.reviewTitle);
  const [editedContent, setEditedContent] = useState(props.reviewContent);
  const [editedRevisit, setEditedRevisit] = useState(props.revisit);
  console.log(props)
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
  const revisitEdit = (e) => {
    setEditedRevisit(e);
  };

  const reviewEditSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    const profile = {
      email : localStorage.getItem("email"),
      reviewTitle: editedTitle,
      reviewContent: editedContent,
      reviewIndex: props.reviewIndex,
      reviewImage: props.reviewImage,
      revisit: editedRevisit,

    };
    instance
      .put(
        `/api/auth/updateReview?reviewIndex=${props.reviewIndex}`,
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
          <div className={styles.visitbtn}>
            <button
              className={ editedRevisit === 1 ? styles.selected : styles.notSelected }
              name="revisitYes"
              value={editedRevisit}
              onClick={() => {
                revisitEdit(1);
              }}
            >
              재방문 할래요
            </button>
            <button
            className={ editedRevisit === 0 ? styles.selected : styles.notSelected }
              name="revisitNo"
              value={editedRevisit}
              onClick={() => {
                revisitEdit(0);
              }}
            >
              재방문 안할래요
            </button>
          </div>
          <label htmlFor="editedTitle">한줄평</label>
          <input
            id="editedTitle"
            type="text"
            value={editedTitle}
            onChange={titleEditHandler}
            className={styles.input}
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