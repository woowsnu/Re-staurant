import React, { useEffect, useState } from 'react';
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
import { resolvePath, useParams } from 'react-router-dom';

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
];

const RestaurantProfile = (props) => {
  const userEmail = localStorage.getItem('email');
  const token = localStorage.getItem('accessToken');
  const bizId = useParams().id;
  const [images, setImages] = useState(DUMMY_IMAGE);
  const [bookmark, setBookmark] = useState([]);
  const [editMark, setEditMark] = useState(false);

  useEffect(() => {
    const fetchBookmark = async () => {
      try {
        const res = await instance.get(
          `/restaurant/${userEmail}/auth/findUserView`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        const bookmarkArray = res.data;
        const filterByBusId = bookmarkArray.filter((el) => el.busId === bizId);
        if (filterByBusId.length > 0) {
          setBookmark(filterByBusId[0]);
          setEditMark(true);
        } else if (filterByBusId.length === 0) {
          setEditMark(false);
        }
      } catch (error) {
        console.error('북마크를 불러오지 못했습니다.', error);
      }
    };
    fetchBookmark();
  }, [editMark]);

  // const markClickHandler = () => {
  //   setEditMark(!editMark);
  // };

  //북마크 추가
  const createBookmarkHandler = async () => {
    const { data } = await instance.post(
      `/restaurant/createLike/auth`,
      { busId: props.restaurant.busId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      }
    );
    console.log(data);
    setEditMark(true);
  };

  const deleteBookmarkHandler = async () => {
    const res = await instance.delete(
      `/restaurant/${bookmark?.likeIndex}/auth/deleteLike`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    setBookmark('');
    setEditMark(false);
    console.log(res);
  };

  return (
    <div className={styles.container}>
      <input type='checkbox' />
      {images ? (
        <div className={styles.resImage}>
          <ImageSlider images={images} />
        </div>
      ) : (
        <img
          className={styles.resImage}
          src={require('../../assets/images/restaurant_default_img.jpg')}
          alt={props.restaurant.restaurantName}
        />
      )}
      <div className={styles.wrap}>
        <div className={styles.profileWrap}>
          <div>
            {props.restaurant.restaurantCategory?.split('>')[0] === '음식점'
              ? props.restaurant.restaurantCategory?.split('>')[0]
              : props.restaurant.restaurantCategory?.split('>')[1]}{' '}
            / {props.restaurant.siCode} {props.restaurant.guCode}
          </div>
          <div>
            {editMark ? (
              <label
                className={styles.bookmark}
                onClick={deleteBookmarkHandler}
              >
                <FaBookmark />
              </label>
            ) : (
              <label
                className={styles.bookmark}
                onClick={createBookmarkHandler}
              >
                <FaRegBookmark />
              </label>
            )}
            <input
              type='checkbox'
              // value={editMark}
              checked={editMark}
              // onChange={markClickHandler}
            />

            <button>
              <FaShareAlt className={styles.share} />
            </button>
          </div>
        </div>
        <h1 className={styles.restaurantName}>
          {props.restaurant.restaurantName}
        </h1>
        <div className={styles.star}>
          <FaStar style={{ color: '#f8d90f', fontSize: '20px' }} />{' '}
          {props.restaurant.avgRating}
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
          <p>{props.restaurant.description}</p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantProfile;
