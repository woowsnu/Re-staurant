import React from 'react';
import { Link } from 'react-router-dom';
import styles from './SmallListCard.module.css';

const ListCard = (props) => {
  const reviewArr = props.data?.reviewList.filter((el)=> el.tag === 0)

  return (
    <div className={styles.container}>
      <Link to={`/detail/${props.data?.busId}`} state={{state: reviewArr}}>
        <div className={styles.restaurantsection}>
          <img
            src={reviewArr[0].reviewImage}
            alt='search_result_img'
            className={styles.img}
          />
          <div className={styles.restaurantinfo}>
          <p className={styles.restaurantName}>{props.data.restaurantName}</p>
          <p>
            {props.data.siCode} {props.data.guCode} /{' '}
            {props.data.restaurantCategory}
          </p>
          </div>
        </div>
        <div className={styles.detail2}></div>
      </Link>
      <div className={styles.bookMark}>
      </div>
    </div>
  );
};

export default ListCard;