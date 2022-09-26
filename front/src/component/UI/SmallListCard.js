import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './SmallListCard.module.css';
import { FaRunning } from 'react-icons/fa';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import colors from '../../styles/colors';
import defualtImage from '../../assets/images/restaurant_default_img.jpg';

const ListCard = (props) => {
  const [check, setCheck] = useState(false);

  const checkOnClickHandler = () => {
    setCheck(true);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.imgsection}>
        <img
          src={defualtImage}
          alt='search_result_img'
          className={styles.img}
        />
      </div>
      <div className={styles.description}>
        <div className={styles.firstline}>
          <div className={styles.restaurantName}>
            {props.data.restaurantName}
          </div>
          <label htmlFor='bookmark' className={styles.bookmarkImg}>
            {props.data?.likeIndex !== null ? (
              <FaBookmark
                style={{ color: `${colors.primary1}`, fontSize: '24px' }}
              />
            ) : (
              <FaRegBookmark
                style={{ color: `${colors.gray4}`, fontSize: '24px' }}
              />
            )}
          </label>
          <input id='bookmark' type='checkbox' onClick={checkOnClickHandler} />
        </div>
        {/* <div className={styles.revisit}>
          <FaRunning /> 재방문 희망 98%{' '}
        </div> */}
        <div className={styles.detail2}>
          <div>
            {props.data.siCode} {props.data.guCode} /{' '}
            {props.data.restaurantCategory}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCard;
