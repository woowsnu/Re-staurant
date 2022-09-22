import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReviewListItem from '../Restaurant/ReviewListItem';
import { FaPen, FaQuestionCircle } from 'react-icons/fa';
import Button from '../UI/Button';
import ChartBar from './Chart/ChartBar';
import styles from './RestaurantReview.module.css';
import defaultImg from '../../assets/images/restaurant_default_img.jpg';

const RestaurantReview = (props) => {
  const isLogin = localStorage.getItem('isLoggedIn');
  const {
    restaurantName,
    siCode,
    guCode,
    restaurantCategory,
    busId,
    keywordList,
    authorCount,
    ...others
  } = props.restaurant;

  const ourReview = props.reviews?.filter((el) => el.tag === 1);
  const ourReviewRevisit = ourReview?.filter((el) => el.revisit === 1);
  const otherReview = props.reviews?.filter((el) => el.tag === 0);

  const [reviewTag, setReviewTag] = useState(true);

  const ourReviewHandler = () => {
    setReviewTag(true);
  };

  const otherReviewHandler = () => {
    setReviewTag(false);
  };

  const simpleRestaurantProfile = {
    name: restaurantName,
    siCode: siCode,
    guCode: guCode,
    category: restaurantCategory,
    busId: busId,
    img: defaultImg,
  };

  const [modalView, setModalView] = useState(false);
  const modalViewHandler = (e) => {
    e.preventDefault();
    setModalView(!modalView);
  };

  return (
    <div id='res-reviews' className={styles.container}>
      <div className={styles.titleAndButton}>
        <h3>리뷰</h3>
        {!!isLogin ? (
          <Link to={`/review/${busId}`} state={simpleRestaurantProfile}>
            <Button style={{ backgroundColor: '#51B059', color: '#fff' }}>
              <FaPen style={{ fontSize: '12px' }} /> 리뷰쓰기
            </Button>
          </Link>
        ) : (
          <div>
            리뷰는{' '}
            <Link to='/login'>
              <span style={{ color: '#51B059', textDecoration: 'underline' }}>
                로그인
              </span>
            </Link>{' '}
            후 작성 가능합니다.
          </div>
        )}
      </div>
      <div className={styles.reviewTagArea}>
        <div className={styles.reviewTagText}>
          <p>방문객 {authorCount} 명의 키워드 후기</p>
          <FaQuestionCircle
            onMouseEnter={modalViewHandler}
            onMouseLeave={modalViewHandler}
          />
          {modalView ? (
            <div className={styles.reviewTagTip}>
              네이버지도의 리뷰 정보를 제공합니다.
            </div>
          ) : (
            ''
          )}
        </div>
        <div className={styles.reviewTags}>
          {keywordList?.map((item) => (
            <div className={styles.reviewTag} key={item.keywordsIndex}>
              <span>{item.keywordsName}</span>
              <span className={styles.reviewTagCount}>
                {item.keywordsCount}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.visitbtn}>
        <button className={styles.visitbtn1} onClick={ourReviewHandler}>
          리스토랑 리뷰 ({props.reviews.length})
        </button>
        <button onClick={otherReviewHandler}>타사 리뷰</button>
      </div>
      {reviewTag && (
        <div className={styles.revisit}>
          <p>리스토랑 재방문율</p>
          {props.reviews?.length >= 10 ? (
            <ChartBar
              reviews={ourReviewRevisit.length}
              reviewCount={ourReview.length}
            />
          ) : (
            <p className={styles.nochart}>재방문률은 리뷰 10개 이상일 시 노출됩니다.</p>
          )}
          {ourReview.map((review, i) => (
            <ReviewListItem key={i} review={review} />
          ))}
        </div>
      )}
      {!reviewTag && (
        <div>
          {otherReview.map((review, i) => (
            <ReviewListItem key={i} review={review} />
          ))}
        </div>
      )}
      {props.reviews?.length === 0 && (
        <div className={styles.noReview}>아직 등록된 리뷰가 없습니다.</div>
      )}
    </div>
  );
};

export default RestaurantReview;
