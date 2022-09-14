import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './PhotoCard.module.css';
import { FaBookmark, FaRegBookmark, FaRunning } from 'react-icons/fa';
import colors from '../../styles/colors';
import SmallChartBar from '../Restaurant/Chart/SmallChartBar';

const PhotoCard = (props) => {
  const [check, setCheck] = useState(props.isChecked);

  const checkHandler = () => {
    setCheck(!check);

    if (check) {
      props.updateBookmark(1);
    } else {
      props.updateBookmark(0);
    }
  };

  return (
    <div className={styles.container}>
      <Link to={`/detail/${props.id}`}>
        <div className={styles.imgwrapper}>
          {/* <p>"가성비가 좋고 분위기가 좋았어요"</p> */}
          <div className={styles.bggradient}></div>
        </div>
      </Link>
      <div className={styles.infowrapper}>
        <div className={styles.resInfo}>
          <Link to={`/detail/${props.id}`}>
            <h4>식당 이름</h4>
            <p>한식 / 여의도</p>
          </Link>
        </div>
        <div className={styles.bookmark}>
          <label htmlFor='bookmark' className={styles.bookmarkImg}>
            {!!check ? (
              <FaRegBookmark
                style={{ color: `${colors.gray4}`, fontSize: '24px' }}
              />
            ) : (
              <FaBookmark
                style={{ color: `${colors.primary1}`, fontSize: '24px' }}
              />
            )}
          </label>
          <input id='bookmark' type='checkbox' onChange={checkHandler} />
        </div>
      </div>
      <div className={styles.ChartBar}>
        <FaRunning style={{paddingRight: '6px'}}/>
        <SmallChartBar reviews={2} reviewCount={10}/>
      </div>
    </div>
  );
};

export default PhotoCard;

// background-image: url(${(props) => props.bgImg});
