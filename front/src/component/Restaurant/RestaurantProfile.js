import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  const ctx = useContext(AuthContext)
  const bizId = useParams().id;
  const navigate = useNavigate();
  const [images, setImages] = useState(DUMMY_IMAGE);
  const [likeIndex, setLikeIndex] = useState('');
  const [editMark, setEditMark] = useState(false);

  const ourReview = props.reviews?.filter((el) => el.tag === 1);
  const ourReviewRevisit = ourReview?.filter((el) => el.revisit === 1);

  const fetchBookmark = async () => {
    try {
      const data = await resInfoAPI.getUserBookMark()
      const bookmarkArray = data;
      const filterByBusId = bookmarkArray.filter((el) => el.busId === bizId);
      console.log(filterByBusId);
      if (filterByBusId.length > 0) {
        setLikeIndex(filterByBusId[0].likeIndex);
        setEditMark(true);
      } else if (filterByBusId.length === 0) {
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
    const bookmarkData = {
      busId: bizId,
    };
    const data = await resInfoAPI.createUserBookMark(bizId);
    console.log(data)
    setEditMark(true);
  };

  // 북마크 삭제
  const deleteBookmarkHandler = async () => {
    const data = await resInfoAPI.deleteUserBookMark(likeIndex);
    console.log(data);
    setLikeIndex('');
    setEditMark(false);
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
            <input type='checkbox' checked={editMark} />
            {/* <div>
              <FaShareAlt className={styles.share} />
            </div> */}
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