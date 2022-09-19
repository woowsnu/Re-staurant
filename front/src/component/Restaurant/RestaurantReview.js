import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReviewListItem from '../Restaurant/ReviewListItem';
import Button from '../UI/Button';
import styles from './RestaurantReview.module.css';

const RestaurantReview = (props) => {
  const isLogin = localStorage.getItem('isLoggedIn');
  const {
    restaurantName,
    siCode,
    guCode,
    restaurantCategory,
    busId,
    keywordList,
    authorCount,
    ...others
  } = props.restaurant;
  // const revisitYes = props.reviews?.filter((el) => el.revisit === 1);
  // const revisitNo = props.reviews?.filter((el) => el.revisit === 0);
  // const [hopeRevisit, setHopeRevisit] = useState(true);

  // const hopeRevisitHandler = () => {
  //   setHopeRevisit(true);
  // };

  // const nopeRevisitHandler = () => {
  //   setHopeRevisit(false);
  // };

  const simpleRestaurantProfile = {
    name: restaurantName,
    siCode: siCode,
    guCode: guCode,
    category: restaurantCategory,
    busId: busId,
    // img: props.restaurant.imgUrl,
  };

  return (
    <div id='res-reviews' className={styles.container}>
      <div>
        <h3>리뷰</h3>
      </div>
      {!!isLogin ? (
        <Link to={`/review/${busId}`} state={simpleRestaurantProfile}>
          <Button>리뷰쓰기</Button>
        </Link>
      ) : (
        <div>리뷰는 로그인 후 작성 가능합니다.</div>
      )}
      <p>방문객 {authorCount} 명의 키워드 후기</p>
      <div className={styles.reviewTags}>
        {keywordList?.map((item) => (
          <div className={styles.reviewTag} key={item.keywordsIndex}>
          <span>{item.keywordsName}</span><span className={styles.reviewTagCount}>{item.keywordsCount}</span>
          </div>
        ))}
      </div>
      {/* <div className={styles.visitbtn}>
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
      </ul> */}
      {props.reviews?.length === 0 && <div>아직 등록된 리뷰가 없습니다.</div>}
      <ul>
        {props.reviews?.map((review) => {
          return <ReviewListItem key={review.reveiwIndex} review={review} />;
        })}
      </ul>
    </div>
  );
};

export default RestaurantReview;
