import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './SmallListCard.module.css';
import defualtImage from '../../assets/images/restaurant_default_img.jpg';
import BookMark from './BookMark';

const ListCard = (props) => {
  const [check, setCheck] = useState(props.editMark);

  const checkOnClickHandler = () => {
    setCheck(true);
  };

  return (
    <div className={styles.container}>
      <Link to={`/detail/${props.data?.busId}`}>
        <div className={styles.restaurantsection}>
          <img
            src={defualtImage}
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
        {/* {props.data?.likeIndex !== null ? (
          <BookMark
            editMarked={check}
            data={props.data}
            onClick={checkOnClickHandler}
          />
        ) : (
          <BookMark
            editMarked={check}
            data={props.data}
            onClick={checkOnClickHandler}
          />
        )} */}
      </div>
    </div>
  );
};

export default ListCard;