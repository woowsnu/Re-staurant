import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import resInfoAPI from '../../api/resInfoAPI';
import ChartBar from './Chart/ChartBar';
import ImageSlider from '../UI/ImageSlider';
import styles from './RestaurantProfile.module.css';
import {
  FaBookmark,
  FaRegBookmark,
  FaShareAlt,
  FaRunning,
  FaStar,
} from 'react-icons/fa';

const DUMMY_IMAGE = [
  'https://cdn.pixabay.com/photo/2016/03/05/19/02/salmon-1238248_960_720.jpg',
  'https://cdn.pixabay.com/photo/2014/09/17/20/26/restaurant-449952_960_720.jpg',
  'https://cdn.pixabay.com/photo/2020/06/08/16/49/pizza-5275191_960_720.jpg',
];

const RestaurantProfile = (props) => {
  const ctx = useContext(AuthContext);
  const rankImg = useLocation().state;
  const busId = useParams().id;
  const navigate = useNavigate();
  const [images, setImages] = useState(DUMMY_IMAGE);
  const [editMark, setEditMark] = useState(false);

  const ourReview = props.reviews?.filter((el) => el.tag === 1);
  const ourReviewRevisit = ourReview?.filter((el) => el.revisit === 1);
  let reviewImages = [];
  if (!!rankImg) {
    rankImg.state
      ?.slice(0, 5)
      .map((item) => reviewImages.push(item.reviewImage));
  }

  const fetchBookmark = async () => {
    try {
      const data = await resInfoAPI.getUserBookMark();
      console.log('프로필에서', data);
      const filterByBusID = data?.filter((el) => el.busId === busId);
      console.log(filterByBusID[0].statusLike);
      if (filterByBusID[0].statusLike === 1) {
        setEditMark(true);
      } else if (filterByBusID[0].statusLike === 0) {
        setEditMark(false);
      }
    } catch (error) {
      console.error('북마크를 불러오지 못했습니다.', error);
    }
  };

  useEffect(() => {
    fetchBookmark();
  }, [editMark]);

  //북마크 추가
  const createBookmarkHandler = async () => {
    if (!ctx.isLoggedIn) {
      alert('로그인 후 이용 가능합니다.');
      navigate('/login');
      return;
    }
    const data = await resInfoAPI.createUserBookMark(busId);
    setEditMark(true);
  };

  // 북마크 삭제
  const deleteBookmarkHandler = async () => {
    const response = await resInfoAPI.deleteUserBookMark(busId);
    if (response.status === 200) {
      setEditMark(false);
    }
  };

  return (
    <div className={styles.container}>
      {images ? (
        <div className={styles.resImage}>
          {!!rankImg ? (
            <ImageSlider images={reviewImages} />
          ) : (
            <ImageSlider images={images} />
          )}
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
                value={editMark}
                htmlFor='bookmark'
                className={styles.bookmark}
                onClick={deleteBookmarkHandler}
              >
                <FaBookmark />
              </label>
            ) : (
              <label
                value={editMark}
                htmlFor='bookmark'
                className={styles.bookmark}
                onClick={createBookmarkHandler}
              >
                <FaRegBookmark />
              </label>
            )}
            <input id='bookmark' type='checkbox' checked={editMark} />
          </div>
        </div>
        <h1 className={styles.restaurantName}>
          {props.restaurant.restaurantName}
        </h1>
        <div className={styles.star}>
          <FaStar
            style={{ color: '#f8d90f', fontSize: '20px', paddingRight: '4px' }}
          />
          <p>{props.restaurant.avgRating}</p>
        </div>
        <div className={styles.revisit}>
          {ourReview?.length >= 10 && (
            <div>
              <p>
                <FaRunning /> 재방문하고 싶어요 ({ourReview?.length}명의 리뷰)
              </p>
              <ChartBar
                reviews={ourReviewRevisit.length}
                reviewCount={ourReview.length}
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
