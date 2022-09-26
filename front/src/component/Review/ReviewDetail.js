import React from 'react'
import Modal from '../UI/Modal'
import styles from '../Restaurant/ReviewListItem.module.css'

const ReviewDetail = (props) => {
  return (
    <Modal>
         <li key={props.review.id} className={styles.container}>
      <div className={styles.reviewInfo}>
        {props.review.user.profileImg === null ? (
          <img alt='avatar' src={require('../../assets/images/user.png')} />
        ) : (
          <img alt='avatar' src={props.review.user.profileImg} />
        )}
        <div>
          <h6>{props.review.user.name}</h6>
          <p>{props.review.date}</p>
        </div>
      </div>
      <div className={styles.reviewContent}>
        <ul className={styles.reviewImage}>
          {props.review.img !== null &&
            props.review.img.map((item) => {
              return (
                <li>
                  <img alt='리뷰 이미지' src={item.url} />
                </li>
              );
            })}
        </ul>
        <h4>"{props.review.comment}"</h4>
        <p>{props.review.review}</p>
      </div>
    </li>
    </Modal>
  )
}

export default ReviewDetail