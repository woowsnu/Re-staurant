import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReviewDetail from "../Review/ReviewDetail";
import Button from "../UI/Button";
import styles from "./ReviewListItem.module.css";

const ReviewListItem = (props) => {
  const [modalView, setModalView] = useState(false);

  const modalViewHandler = () => {
    setModalView(!modalView);
  };

  const emailForMypage = {
    email: props.review.email,
  };

  const isLoginUser = localStorage.getItem("email");

  const randomNum = Math.floor(Math.random() * 200);
  const avatar = `https://picsum.photos/id/${randomNum}/50/50`;

  return (
    <li key={props.review?.reviewIndex} className={styles.container}>
      <Link to={`/mypage/${props.review?.nickName}`} state={emailForMypage}>
        <div className={styles.reviewInfo}>
          <div className={styles.profile}>
            <img alt="avatar" src={avatar} className={styles.profileImg} />
            {/* {props.review.user.profileImg === null ? (
          <img alt='avatar' src={require('../../assets/images/user.png')} />
        ) : (
          <img alt='avatar' src={props.review.user.profileImg} />
        )} */}
            <div>
              <h6>{props.review?.nickName}</h6>
              <p>{props.review?.createDate.split("T")[0]}</p>
            </div>
          </div>
          <div>
            {isLoginUser === props.review.email && (
              <Link to="/mypage">
                <Button>리뷰 관리</Button>
              </Link>
            )}
          </div>
        </div>
      </Link>
      <div className={styles.reviewContent} onClick={modalViewHandler}>
        {/* <ul className={styles.reviewImage}>
          {props.review.img === null && ""}
          {props.review.img?.length > 3 && (
            <>
              <li>
                <img alt="리뷰 이미지" src={props.review.img[0].url} />
              </li>
              <li>
                <img alt="리뷰 이미지" src={props.review.img[1].url} />
              </li>
              <li>
                <img alt="리뷰 이미지" src={props.review.img[2].url} />
              </li>
              <li className={styles.reviewImageOver}>
                <div className={styles.imgBlack}>
                  +{props.review.img?.length - 3}
                </div>
                <img alt="리뷰 이미지" src={props.review.img[3].url} />
              </li>
            </>
          )}
          {props.review.img?.length <= 3 &&
            props.review.img.map((item) => {
              return (
                <li key={item.id}>
                  <img alt="리뷰 이미지" src={item.url} />
                </li>
              );
            })}
        </ul> */}
        {props.review.tag === 1 ? <h4>"{props.review?.reviewTitle}"</h4> : ""}
        <p>{props.review?.reviewContent}</p>
        {props.review.tag === 1 ? "" : <img src={props.review.reviewImage} className={styles.img} />}
        {modalView ? (
          <ReviewDetail
            review={props.review}
            closeModal={() => {
              setModalView(false);
            }}
          />
        ) : (
          ""
        )}
      </div>
    </li>
  );
};

export default ReviewListItem;
