import React, { useState } from "react";
import styles from "./MyReviews.module.css";
import axios from "../../api/axios";

const MyReviews = (props) => {
  const [reviewEdit, setReviewEdit] = useState(false);
  const [editedReview, setEditedReview] = useState("");

  const reviewEditOpenHandler = () => {
    setReviewEdit(true);
  };
  const reviewEditCloseHandler = () => {
    setReviewEdit(false);
  };

  const reviewWrite = (e) => {
    e.preventDefault();
    setEditedReview(e.target.value);
  };

  // const token = localStorage.getItem("token");
  // const id = props.userdata.review[0].id;
  // const URL = "http://localhost:3500/user";
  // const saveEditedReview = () => {
  //   const newReview = { id, review: editedReview };
  //   axios
  //     .patch(`${URL}/${id}`, JSON.stringify(newReview), {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: token,
  //       },
  //     })
  //     .then(function (response) {
  //       setEditedReview("");
  //       // stateManage();
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };
  
  return (
    <>
      {/* <h3>작성한 리뷰가 {props.userdata.review.length}개 있어요</h3>

      <div className={styles.flexcontainer}>
        <ul className={styles.reviewwrap}>
          <li className={styles.reviewwrap}>
            <span className={styles.editbuttons}>
              <button onClick={reviewEditOpenHandler}>수정</button>
              <button>삭제</button>
            </span>
            <ul className={styles.imageul}>
              {props.userdata.review[0].img.map((img) => (
                <li className={styles.imagelist} key={img.id}>
                  <img className={styles.img} src={img.url} />
                </li>
              ))}
            </ul>
            <span className={styles.contents}>
              {props.userdata.review[0].restaurantName}
              <br />
              {props.userdata.review[0].date}
              <br />
              {reviewEdit ? (
                <div>
                  <input onChange={reviewWrite} value={editedReview} />
                  <button onClick={saveEditedReview}>저장하기</button>
                  <button onClick={reviewEditCloseHandler}>닫기</button>
                </div>
              ) : (
                <div>{props.userdata.review[0].review}</div>
              )}
              <br />
            </span>
          </li>
        </ul>
      </div> */}
    </>
  );
};

export default MyReviews;
