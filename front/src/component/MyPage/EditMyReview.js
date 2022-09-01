import React, { useState } from "react";
import axios from "../../api/axios";
import Modal from "../UI/Modal";

const EditMyReview = (props) => {
  const [editedReview, setEditedReview] = useState("");
  const closeModal = () => {
    props.closeModal();
  };

  console.log(props.reviewdata.review)
  
  const reviewEditHandler = (e) => {
    e.preventDefault();
    setEditedReview(e.target.value);
  }

  const token = localStorage.getItem("token")
  const id = props.reviewdata.id;
  const URL = "http://localhost:3500/user"
  const saveEditedReview = () => {
    const newReview = { id , review: editedReview };
    axios
      .patch(
        `${URL}/${id}`,
        JSON.stringify(newReview),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          }
        },
      ).then(function (response) {
        setEditedReview("")
        // stateManage();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <Modal>
      <label htmlFor="review">리뷰</label>
      <input id="review" type="text" onChange={reviewEditHandler} />
      <button onClick={saveEditedReview}>저장하기</button>
      <button onClick={closeModal}>닫기</button>
    </Modal>
  );
};

export default EditMyReview;
