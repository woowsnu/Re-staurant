import React from 'react';
import ChartBar from './Chart/ChartBar';
import styles from './RestaurantProfile.module.css';
import { FaBookmark, FaRegBookmark, FaShareAlt } from 'react-icons/fa';
import colors from '../../styles/colors'

const RestaurantProfile = (props) => {
  const { restaurantCategory, siCode, guCode, restaurantName, description } =
    props.restaurant;
  return (
    <div className={styles.container}>
      <img className={styles.resImage} src={require('../../assets/images/restaurant_default_img.jpg')} alt={restaurantName} />
      <div className={styles.wrap}>
        <div className={styles.profileWrap}>
          <div className={styles.profileUtil}>
            {restaurantCategory && restaurantCategory.split('>')[0]} / {siCode}{' '}
            {guCode}
          </div>
          <div>
          <FaBookmark style={{color: `${colors.primary1}`, fontSize: '24px'}}/>
          <FaShareAlt style={{color: `${colors.gray2}`, fontSize: '24px'}}/>
          </div>
        </div>
        <h1 className={styles.restaurantName}>{restaurantName}</h1>
        {/* <div>
          <p>재방문하고 싶어요 ({props.reviews.length}명의 리뷰)</p>
          <ChartBar reviews={props.reviews}/>
        </div> */}
        <div>
          <h4>매장소개</h4>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantProfile;
