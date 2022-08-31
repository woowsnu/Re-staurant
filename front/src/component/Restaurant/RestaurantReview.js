import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./RestaurantInfo.module.css";

const RestaurantReview = (props) => {
  const revisitYes = props.reviews.filter((el) => el.revisit === 1);
  const revisitNo = props.reviews.filter((el) => el.revisit === 0);
  const [hopeRevisit, setHopeRevisit] = useState(true);

  const hopeRevisitHandler = () => {
    setHopeRevisit(true);
  };

  const nopeRevisitHandler = () => {
    setHopeRevisit(false);
  };

  const simpleRestaurantProfile = {
    name: props.restaurant.name,
    address: props.restaurant.address,
    category: props.restaurant.category,
    img: props.restaurant.imgUrl
  }

  return (
    <div id="res-reviews" className={styles.container}>
      <div>
        <h3>리뷰</h3>
        <Link to={"/review/write/1"} state={simpleRestaurantProfile} >
          <button>리뷰쓰기</button>
        </Link>
      </div>
      <div>
        <button onClick={hopeRevisitHandler}>재방문하고 싶어요</button>
        <button onClick={nopeRevisitHandler}>재방문 의사 없어요</button>
      </div>
      <ul>
        {hopeRevisit
          ? revisitYes.map((review) => {
              return (
                <li key={review.id}>
                  <div>
                    <div>
                      <img alt="avatar" src={review.user.profileImg} />
                      <p>{review.user.name}</p>
                    </div>
                    <p>{review.date}</p>
                  </div>
                  <div>
                    <p>{review.comment}</p>
                    <img alt="리뷰 이미지" src={review.img[0].url} />
                    <div>{review.review}</div>
                    <button>더보기</button>
                  </div>
                </li>
              );
            })
          : revisitNo.map((review) => {
              return (
                <li key={review.id}>
                  <div>
                    <div>
                      <img alt="avatar" src={review.user.profileImg} />
                      <p>{review.user.name}</p>
                    </div>
                    <p>{review.date}</p>
                  </div>
                  <div>
                    <p>{review.comment}</p>
                    <img alt="리뷰 이미지" src={review.img[0].url} />
                    <div>{review.review}</div>
                    <button>더보기</button>
                  </div>
                </li>
              );
            })}
      </ul>
      <div>
        {/* 페이지네이션 */}
        {/* <a href="#">1</a>
        <a href="#">2</a>
        <a href="#">3</a> */}
      </div>
    </div>
  );
};

export default RestaurantReview;
