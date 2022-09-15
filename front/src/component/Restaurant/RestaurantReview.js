import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReviewListItem from '../Restaurant/ReviewListItem';
import Button from '../UI/Button';
import styles from './RestaurantReview.module.css';

const RestaurantReview = (props) => {
  const {restaurantName, siCode, guCode, restaurantCategory, busId, ...others } = props.restaurant; 
  const revisitYes = props.reviews?.filter((el) => el.revisit === 1);
  const revisitNo = props.reviews?.filter((el) => el.revisit === 0);
  const [hopeRevisit, setHopeRevisit] = useState(true);

  const hopeRevisitHandler = () => {
    setHopeRevisit(true);
  };

  const nopeRevisitHandler = () => {
    setHopeRevisit(false);
  };

  const simpleRestaurantProfile = {
    name: restaurantName,
    siCode: siCode,
    guCode: guCode,
    category : restaurantCategory,
    busId: busId,
    // img: props.restaurant.imgUrl,
  };

  return (
    <div id='res-reviews' className={styles.container}>
      <div>
        <h3>리뷰</h3>
      </div>
      <Link to={`/review/${busId}`} state={simpleRestaurantProfile}>
        <Button>리뷰쓰기</Button>
      </Link>
      <div className={styles.visitbtn}>
        <button className={styles.visitbtn1} onClick={hopeRevisitHandler}>
          재방문하고 싶어요
        </button>
        <button onClick={nopeRevisitHandler}>재방문 의사 없어요</button>
      </div>
      <ul>
        {hopeRevisit
          ? revisitYes.map((review) => {
              return <ReviewListItem key={review.id} review={review} />;
            })
          : revisitNo.map((review) => {
              return <ReviewListItem key={review.id} review={review} />;
            })}
      </ul>
      {/* <div>
        페이지네이션
        <a href="#">1</a>
        <a href="#">2</a>
        <a href="#">3</a>
      </div> */}
    </div>
  );
};

export default RestaurantReview;
