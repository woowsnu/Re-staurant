import React from 'react';

const ReviewListItem = (props) => {
  return (
    <li key={props.review.id}>
      <div>
        <div>
          <img alt='avatar' src={props.review.user.profileImg} />
          <p>{props.review.user.name}</p>
        </div>
        <p>{props.review.date}</p>
      </div>
      <div>
        <p>{props.review.comment}</p>
        <img alt='리뷰 이미지' src={props.review.img[0].url} />
        <div>{props.review.review}</div>
        <button>더보기</button>
      </div>
    </li>
  );
};

export default ReviewListItem;
