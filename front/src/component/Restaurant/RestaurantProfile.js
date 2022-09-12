import React, { useState } from 'react';
import ChartBar from './Chart/ChartBar';
// import SimpleImageSlider from "react-simple-image-slider";
import styles from './RestaurantProfile.module.css';

import {
  FaBookmark,
  FaRegBookmark,
  FaShareAlt,
  FaRunning,
} from 'react-icons/fa';
import ImageSlider from '../UI/ImageSlider';

const DUMMY_IMAGE = [
  { id: 1, url: 'https://cdn.pixabay.com/photo/2016/03/05/19/02/salmon-1238248_960_720.jpg' },
  { id: 2, url: 'https://cdn.pixabay.com/photo/2014/09/17/20/26/restaurant-449952_960_720.jpg' },
  { id: 3, url: 'https://cdn.pixabay.com/photo/2020/06/08/16/49/pizza-5275191_960_720.jpg' },
  { id: 4, url: 'https://cdn.pixabay.com/photo/2016/06/19/17/56/eggs-1467286_960_720.jpg' },
  { id: 5, url: 'https://cdn.pixabay.com/photo/2015/11/20/08/17/meat-1052571_960_720.jpg' },
];

const RestaurantProfile = (props) => {
  const [images, setImages] = useState(DUMMY_IMAGE)
  const { restaurantCategory, siCode, guCode, restaurantName, description } =
    props.restaurant;
  return (
    <div className={styles.container}>
      {images ? <div className={styles.resImage}><ImageSlider images={images}/></div>: 
        <img
        className={styles.resImage}
        src={require('../../assets/images/restaurant_default_img.jpg')}
        alt={restaurantName}
      />}
      <div className={styles.wrap}>
        <div className={styles.profileWrap}>
          <div>
            {restaurantCategory && restaurantCategory.split('>')[0]} / {siCode}{' '}
            {guCode}
          </div>
          <div>
            <FaBookmark className={styles.bookmark} />
            <FaShareAlt className={styles.share} />
          </div>
        </div>
        <h1 className={styles.restaurantName}>{restaurantName}</h1>
        <div className={styles.revisit}>
        {props.reviews?.length && (<div>
          <p><FaRunning /> 재방문하고 싶어요 ({props.reviews?.length}명의 리뷰)</p>
          <ChartBar reviews={props.reviews?.filter((el)=>el.revisit ===1).length} reviewCount={props.reviews?.length}/>
        </div>)}
        </div>
        <div className={styles.description}>
          <h4>매장소개</h4>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantProfile;


{/* <div className={styles.resImage}><SimpleImageSlider width={360}
        height={360}
        images={images}
        showBullets={true}
        showNavs={true}/></div> */}