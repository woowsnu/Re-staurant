import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './PhotoCard.module.css';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import colors from '../../styles/colors'

const PhotoCard = (props) => {
  const [check, setCheck] = useState(false);
  const checktest = () => {
    setCheck(!check);
  };

  return (
    <div className={styles.container}>
      <div className={styles.imgwrapper}>
        <Link to={`/detail/${props.id}`}>
          <p>"가성비가 좋고 분위기가 좋았어요"</p>
          <div className={styles.bggradient}></div>
        </Link>
      </div>
      <div className={styles.infowrapper}>
        <div className={styles.resInfo}>
          <Link to={`/detail/${props.id}`}>
            <h4>식당 이름</h4>
            <h5>재방문 희망 72%</h5>
            <p>한식 / 여의도</p>
          </Link>
        </div>
        <div className={styles.bookmark}>
          <label htmlFor='bookmark' className={styles.bookmarkImg}>
            {check ? (
              <FaRegBookmark style={{color: `${colors.gray4}`, fontSize: '24px'}}/>
            ) : (
              <FaBookmark style={{color: `${colors.primary1}`, fontSize: '24px'}}/>
            )}
          </label>
          <input id='bookmark' type='checkbox' onClick={checktest} />
        </div>
      </div>
    </div>
  );
};

export default PhotoCard;

// background-image: url(${(props) => props.bgImg});
