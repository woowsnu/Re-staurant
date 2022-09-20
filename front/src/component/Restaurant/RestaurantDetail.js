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
  const restaurantid = useParams().id;

  // restaurant data fetch
  const fetchRestaurantData = async () => {
    try {
      const {data} = await instance.get(
        `/restaurant/restaurantDetail/${restaurantid}`
      );
      setRestaurant(data);
      setMenus(data.menusList);
      setOptions(data.optionsList)
      setReviews(data.reviewList)
    } catch (error) {
      console.error('에러가 발생했습니다. : ', error);
    }
  };

  useEffect(() => {
    fetchRestaurantData();
  }, []);

  return (
    <div>
      <RestaurantProfile restaurant={restaurant} reviews={reviews} />
      <RestaurantTab reviewCount={reviews.length} />
      <div className='detail'>
        {/* <RestaurantInfo restaurant={restaurant} options={options}/> */}
        <RestaurantMenu menus={menus} />
        <RestaurantReview reviews={reviews} restaurant={restaurant} />
      </div>
    </div>
  );
};

export default RestaurantDetail;
