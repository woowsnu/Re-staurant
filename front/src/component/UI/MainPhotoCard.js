import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BookMark from './BookMark';
import { FaBookmark, FaRegBookmark, FaStar } from 'react-icons/fa';
import styles from './PhotoCard.module.css';
import colors from '../../styles/colors';

const MainPhotoCard = (props) => {
  const {
    busId,
    restaurantName,
    restaurantCategory,
    siCode,
    guCode,
    avgRating,
    likeIndex,
  } = props.data;

  const [check, setCheck] = useState(props.editMark);

  const checkOnClickHandler = () => {
    setCheck(true);
  };

  return (
    <div className={styles.container}>
      <Link to={`/detail/${busId}`}>
        <div className={styles.imgwrapper}>
          <div className={styles.bggradient}></div>
        </div>
      </Link>
      <div className={styles.infowrapper}>
        <div className={styles.resInfo}>
          <Link to={`/detail/${busId}`}>
            <h4>{restaurantName}</h4>
            <div className={styles.star}>
              <FaStar style={{ color: '#f8d90f', fontSize: '12px' }} />
              <p>{avgRating}</p>
            </div>
            <p>
              {restaurantCategory?.split('>')[0] === '음식점'
                ? restaurantCategory?.split('>')[0]
                : restaurantCategory?.split('>')[1]}{' '}
              / {guCode}
            </p>
          </Link>
        </div>
        <div className={styles.bookmark}>
          {likeIndex !== null ? (
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
          )}
          {/* <label htmlFor='bookmark' className={styles.bookmarkImg}>
            {likeIndex !== null ? (
              <FaBookmark
                style={{ color: `${colors.primary1}`, fontSize: '24px' }}
              />
            ) : (
              <FaRegBookmark
                style={{ color: `${colors.gray4}`, fontSize: '24px' }}
              />
            )}
          </label>
          <input id='bookmark' type='checkbox' /> */}
        </div>
      </div>
    </div>
  );
};

export default MainPhotoCard;
