import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { instance } from '../../api/axios';
// import ReviewImgUpload from "./ReviewImgUpload";

const ReviewWrite = () => {
  const navigate = useNavigate();
  const restaurant = useLocation().state;
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

    // 리뷰데이터
    const newReview = {
      reviewTitle: comment,
      reviewContent: review,
    };
    // 헤더
    const token = localStorage.getItem('accessToken');
    const config = {
      Headers: {
        Authorization: token,
      },
    };

    try {
      const response = await instance.post(
        `/review/${restaurant.busId}/auth/createReview`,
        newReview,
        config
      );
      console.log(response);
      // if (response.data.status === 403) {
      //   console.log("dhkdkdkdkdkdkdk")
      //   await alert('작성이 완료되었습니다.');
      //   await navigate(-1);
      // }
    } catch (error) {
      console.log(error.response.data.status);
    }
  };

  return (
    <div>
      <div>
        <img src={restaurant.img} alt={restaurant.name} />
        <p>{restaurant.category}</p>
        <p>
          {restaurant.siCode} {restaurant.guCode}
        </p>
        <p>{restaurant.name}</p>
      </div>
      <form onSubmit={reviewSubmitHandler}>
        <h3>{restaurant.name}에 재방문 하시겠어요?</h3>
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

        <h3>한줄평</h3>
        <input
          type='text'
          placeholder='한줄평을 작성해주세요'
          onChange={commentChangeHandler}
          value={comment}
        />
        <h3>상세리뷰</h3>
        <textarea
          placeholder='이 곳에서의 경험은 어떠셨나요? 맛, 위생, 주차 등 회원님의 경험을 들려주세요.'
          cols={50}
          value={review}
          onChange={reviewChangeHandler}
        ></textarea>
        <h3>사진첨부</h3>
        <p>사진은 최대 5장까지 등록 가능합니다.</p>
        <input type='file' multiple={true} onChange={saveImage} />
        <button onClick={sendToServer}>등록</button>
        {/* <ReviewImgUpload /> */}
        <button type='button' onClick={reviewCancelHandler}>
          작성취소
        </button>
        <button type='submit'>작성완료</button>
      </form>
    </div>
  );
};

export default ReviewWrite;
