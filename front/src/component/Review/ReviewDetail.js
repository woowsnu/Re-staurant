import React from 'react';
import Modal from '../UI/Modal';
import styles from './ReviewDetail.module.css';

const ReviewDetail = (props) => {
  console.log(props);
  const {
    reviewIndex,
    restaurantName,
    nickName,
    modifiedDate,
    reviewTitle,
    reviewContent,
    reviewImage,
    tag,
    ...others
  } = props.review;
  return (
    <Modal>
      <li key={reviewIndex} className={styles.container}>
        <div className={styles.reviewInfo}>
          <img alt='avatar' src={require('../../assets/images/user.png')} />
          {/* {props.review.user.profileImg === null ? (
          <img alt='avatar' src={require('../../assets/images/user.png')} />
        ) : (
          <img alt='avatar' src={props.review.user.profileImg} />
        )} */}
          <div>
            <h6>{nickName}</h6>
            <p>{modifiedDate}</p>
          </div>
        </div>
        <div
          className={styles.imgsection}
          style={{ backgroundImage: `url(${reviewImage})` }}
        >
          {tag === 0 && <img src={reviewImage} />}
          {/* <ul className={styles.reviewImage}>
            {reviewImage.length === 1 && (
              <li>
                <img alt='리뷰 이미지' src={reviewImage} />
              </li>
            )}
          </ul> */}
          <div className={styles.backdrop}></div>
        </div>
        <div className={styles.textsection}>
          <h4>"{reviewTitle}"</h4>
          <p>{reviewContent}</p>
        </div>
      </li>
    </Modal>
  );
};

export default ReviewDetail;
