import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { instance } from '../../api/axios';
import Button from '../UI/Button';
import Input from '../UI/Input';
import styles from './ReviewWrite.module.css';
// import ReviewImgUpload from "./ReviewImgUpload";

const ReviewWrite = (props) => {
  const navigate = useNavigate();
  // RestarantReview에서 대표 이미지도 하나 받아와야함
  const { name, siCode, guCode, category, busId } = props.restaurant;

  const [comment, setComment] = useState('');
  const [review, setReview] = useState('');
  const [revisit, setRevisit] = useState(1);
  const [image, setImage] = useState(null);

  // 재방문의사
  const revisitClickHandler = (value) => {
    setRevisit(value);
    console.log(value);
  };

  // 한줄평
  const commentChangeHandler = (e) => {
    setComment(e.target.value);
  };

  // 리뷰
  const reviewChangeHandler = (e) => {
    setReview(e.target.value);
  };

  // 사진 업로드
  const saveImage = async (e) => {
    e.preventDefault();
    console.log(e.target.files[0]);
    // if(e.target.files[0]) {
    //   URL.revokeObjectURL(image.preview_URL);
    setImage(e.target.files[0]);
    // }
    // await console.log(image)
  };

  const sendToServer = async () => {
    const formData = new FormData();
    formData.append('file', image.file);
    // const config = {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   }
    // }
    await axios.post('http://localhost:3500/review-img', formData);
  };

  const reviewCancelHandler = () => {
    setComment('');
    setReview('');
    setRevisit(1);
    navigate(-1);
  };

  const reviewSubmitHandler = async (e) => {
    e.preventDefault();

    const newReview = {
      reviewTitle: comment,
      reviewContent: review,
    };

    try {
      const token = localStorage.getItem('accessToken');
      await instance
        .post(`/review/${busId}/auth/createReview`, newReview, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        })
        .then((response) => {
          return response;
        })
        .then((data) => {
          if (data.status === 200) {
            alert('작성이 완료되었습니다.');
            navigate(-1);
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.simpleProfile}>
        <img src='#' alt={name} />
        <div>
          <p>
            {category} / {siCode} {guCode}
          </p>
          <h4>{name}</h4>
        </div>
      </div>
      <form onSubmit={reviewSubmitHandler}>
        <h3>{name}에 재방문 하시겠어요?</h3>
        <div className={styles.visitbtn}>
          <button
            type='button'
            name='revisit'
            value={revisit}
            onClick={() => {
              revisitClickHandler(1);
            }}
          >
            재방문 할래요
          </button>
          <button
            type='button'
            name='revisit'
            value={revisit}
            onClick={() => {
              revisitClickHandler(0);
            }}
          >
            재방문 안할래요
          </button>
        </div>

        <h3>한줄평</h3>
        <input
          id='title'
          style={{ width: '100%' }}
          type='text'
          placeholder='한줄평을 작성해주세요'
          onChange={commentChangeHandler}
          value={comment}
        />
        <h3>상세리뷰</h3>
        <textarea
          id='comment'
          className={styles.comment}
          placeholder='이 곳에서의 경험은 어떠셨나요? 맛, 위생, 주차 등 회원님의 경험을 들려주세요.'
          cols={50}
          value={review}
          onChange={reviewChangeHandler}
        ></textarea>
        <div className={styles.imgupload}>
          <h3>사진첨부</h3>
          <p>사진은 최대 5장까지 등록 가능합니다.</p>
          <input type='file' multiple={true} onChange={saveImage} />
          <button onClick={sendToServer}>등록</button>
        </div>
        {/* <ReviewImgUpload /> */}
        <div>
          <button type='button' onClick={reviewCancelHandler}>
            작성취소
          </button>
          <button id='ok' type='submit' onClick={reviewSubmitHandler}>
            작성완료
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewWrite;
