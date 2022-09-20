import React, { useState } from 'react';
import ChartBar from './Chart/ChartBar';
import { instance } from '../../api/axios';
import styles from './RestaurantProfile.module.css';
import {
  FaBookmark,
  FaRegBookmark,
  FaShareAlt,
  FaRunning,
  FaStar,
} from 'react-icons/fa';
import ImageSlider from '../UI/ImageSlider';

const DUMMY_IMAGE = [
  {
    id: 1,
    url: 'https://cdn.pixabay.com/photo/2016/03/05/19/02/salmon-1238248_960_720.jpg',
  },
  {
    id: 2,
    url: 'https://cdn.pixabay.com/photo/2014/09/17/20/26/restaurant-449952_960_720.jpg',
  },
  {
    id: 3,
    url: 'https://cdn.pixabay.com/photo/2020/06/08/16/49/pizza-5275191_960_720.jpg',
  },
  {
    id: 4,
    url: 'https://cdn.pixabay.com/photo/2016/06/19/17/56/eggs-1467286_960_720.jpg',
  },
  {
    id: 5,
    url: 'https://cdn.pixabay.com/photo/2015/11/20/08/17/meat-1052571_960_720.jpg',
  },
];

const RestaurantProfile = (props) => {
  const [images, setImages] = useState(DUMMY_IMAGE);
  const {
    restaurantCategory,
    siCode,
    guCode,
    restaurantName,
    description,
    busId,
    avgRating,
  } = props.restaurant;
  // const { likeIndex } = props.bookmark;

  const markChangeHandler = (e) => {
    console.log(e.target.checked)
  };

  //북마크 추가
  const createbookmarkHandler = async () => {
    const token = localStorage.getItem('accessToken');
    const email = localStorage.getItem('email');
    const res = await instance.post(
      `/restaurant/createLike/auth`,
      { busId: busId, email: email },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      }
    );
    // props.isMarkedHandler(true);
    console.log(res);
  };
  //북마크 삭제
  const deletebookmarkHandler = async () => {
    const token = localStorage.getItem('accessToken');
    // await instance.delete(
    //   `/restaurant/${likeIndex}/auth/deleteLike`,
    //   {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: token,
    //     },
    //   }
    // );
    // props.ismarkedHandler(false);
  };

  return (
    <div className={styles.container}>
      {images ? (
        <div className={styles.resImage}>
          <ImageSlider images={images} />
        </div>
      ) : (
        <img
          className={styles.resImage}
          src={require('../../assets/images/restaurant_default_img.jpg')}
          alt={restaurantName}
        />
      )}
      <div className={styles.wrap}>
        <div className={styles.profileWrap}>
          <div>
            {restaurantCategory?.split('>')[0] === '음식점'
              ? restaurantCategory?.split('>')[0]
              : restaurantCategory?.split('>')[1]}{' '}
            / {siCode} {guCode}{' '}
          </div>
          <div>
            <label>
              {props.isMarked ? (
                <FaBookmark className={styles.bookmark} onClick={()=>{props.isMarkedHandler(false)}}/>
              ) : (
                <FaRegBookmark className={styles.bookmark} onClick={()=>{props.isMarkedHandler(true)}}/>
              )}
            <input type='checkbox' checked={props.isMarked} onChange={markChangeHandler}/>
            </label>
            <button>
              <FaShareAlt className={styles.share} />
            </button>
          </div>
        </div>
        <h1 className={styles.restaurantName}>{restaurantName}</h1>
        <div className={styles.star}>
          <FaStar style={{ color: '#f8d90f', fontSize: '20px' }} /> {avgRating}
        </div>
        <div className={styles.revisit}>
          {props.reviews?.length >= 10 && (
            <div>
              <p>
                <FaRunning /> 재방문하고 싶어요 ({props.reviews?.length}명의
                리뷰)
              </p>
              <ChartBar
                reviews={props.reviews?.filter((el) => el.revisit === 1).length}
                reviewCount={props.reviews?.length}
              />
            </div>
          )}
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
