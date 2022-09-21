import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { instance } from '../../api/axios';
import RestaurantProfile from './RestaurantProfile';
import RestaurantInfo from './RestaurantInfo';
import RestaurantMenu from './RestaurantMenu';
import RestaurantReview from './RestaurantReview';
import RestaurantTab from './RestaurantTab';

const RestaurantDetail = () => {
  const [restaurant, setRestaurant] = useState([]);
  const [menus, setMenus] = useState([]);
  const [options, setOptions] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [bookmarkIndex, setBookmarkIndex] = useState(0);
  const [isMarked, setIsMarked] = useState(false);
  const busId = useParams().id;
  const userEmail = localStorage.getItem('email');

  // email로 북마크 조회
  const fetchBookmark = async () => {
    try {
      const res = await instance.get(
        `/restaurant/${userEmail}/auth/findUserView`
      );
      const bookmarkfilter = res.data.filter((el)=>el.busId === busId)
      if(!!bookmarkfilter) {
        setBookmarkIndex(res.data[0].likeIndex);
        setIsMarked(true)
      } 
      if (bookmarkIndex.length === 0) {
        setBookmarkIndex(null)
        setIsMarked(false)
      }
    } catch (error) {
      console.error(error);
    }
  };

  //restaurant data fetch
  const fetchRestaurantData = async () => {
    try {
      const { data } = await instance.get(
        `/restaurant/restaurantDetail/${busId}`
      );
      setRestaurant(data);
      setMenus(data.menusList);
      setOptions(data.optionsList);
      setReviews(data.reviewList);
    } catch (error) {
      console.error('에러가 발생했습니다. : ', error);
    }
  };

  useEffect(() => {
    fetchRestaurantData();
    fetchBookmark();
  }, []);

  const isMarkedHandler = (data) => {
    setIsMarked(data)
  }

  return (
    <div>
      <RestaurantProfile restaurant={restaurant} reviews={reviews} bookmarkIndex={bookmarkIndex} isMarked={isMarked} isMarkedHandler={isMarkedHandler}/>
      <RestaurantTab reviewCount={reviews.length} />
      <div className='detail'>
        {/* <RestaurantInfo restaurant={restaurant} options={options}/> */}
        <RestaurantMenu menus={menus} />
        <RestaurantReview restaurant={restaurant} reviews={reviews} />
      </div>
    </div>
  );
};

export default RestaurantDetail;

// bookmark={bookmark} isMarked={isMarked} ismarkedHandler={ismarkedHandler}