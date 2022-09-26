import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RestaurantProfile from './RestaurantProfile';
import RestaurantInfo from './RestaurantInfo';
import RestaurantMenu from './RestaurantMenu';
import RestaurantReview from './RestaurantReview';
import RestaurantTab from './RestaurantTab';
import restaurantAPI from '../../api/restaurantAPI';

const RestaurantDetail = () => {
  const [restaurant, setRestaurant] = useState([]);
  const [menus, setMenus] = useState([]);
  const [options, setOptions] = useState([]);
  const [reviews, setReviews] = useState([]);
  const busId = useParams().id;

  //restaurant data fetch
  const fetchRestaurantData = async () => {
    try {
      const data = await restaurantAPI.getOneRestaurantInfo(busId)
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
  }, []);

  return (
    <div>
      <RestaurantProfile
        restaurant={restaurant}
        reviews={reviews}
      />
      <RestaurantTab reviewCount={reviews.length} />
      <div className='detail'>
        <RestaurantInfo restaurant={restaurant} options={options} />
        <RestaurantMenu menus={menus} />
        <RestaurantReview restaurant={restaurant} reviews={reviews} />
      </div>
    </div>
  );
};

export default RestaurantDetail;