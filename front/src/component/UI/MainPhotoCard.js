import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PhotoCard.module.css';
import { FaBookmark, FaRegBookmark, FaRunning, FaStar } from 'react-icons/fa';
import colors from '../../styles/colors';
import SmallChartBar from '../Restaurant/Chart/SmallChartBar';

const PhotoCard = ({ resInfo }) => {
  const {
    busId,
    restaurantName,
    restaurantCategory,
    siCode,
    guCode,
    avgRating,
  } = resInfo;

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
          <label htmlFor='bookmark' className={styles.bookmarkImg}>
            {/* <FaRegBookmark
                style={{ color: `${colors.gray4}`, fontSize: '24px' }}
              />
            ) : ( */}
            <FaBookmark
              style={{ color: `${colors.primary1}`, fontSize: '24px' }}
            />
          </label>
          <input id='bookmark' type='checkbox' />
        </div>
      </div>
      {/* <div className={styles.ChartBar}>
        <FaRunning style={{paddingRight: '6px'}}/>
        <SmallChartBar reviews={2} reviewCount={10}/>
      </div> */}
    </div>
  );
};

export default PhotoCard;

// background-image: url(${(props) => props.bgImg});
