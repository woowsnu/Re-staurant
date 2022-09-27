import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import resInfoAPI from '../../api/resInfoAPI';
import RestaurantProfile from './RestaurantProfile';
import RestaurantInfo from './RestaurantInfo';
import RestaurantMenu from './RestaurantMenu';
import RestaurantReview from './RestaurantReview';
import RestaurantTab from './RestaurantTab';
import Loading from '../UI/Loading';

const RestaurantDetail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [restaurant, setRestaurant] = useState([]);
  const [menus, setMenus] = useState([]);
  const [options, setOptions] = useState([]);
  const [reviews, setReviews] = useState([]);
  const busId = useParams().id;

  const fetchRestaurantData = async () => {
    setIsLoading(true);
    try {
      const data = await resInfoAPI.getOneRestaurantInfo(busId);
      setRestaurant(data);
      setMenus(data.menusList);
      setOptions(data.optionsList);
      setReviews(data.reviewList);
      setIsLoading(false);
    } catch (error) {
      console.error('식당 정보를 불러오는데 실패했습니다. : ', error);
    }
  };

  useEffect(() => {
    fetchRestaurantData();
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loading type='res'/>
      ) : (
        <>
          <RestaurantProfile restaurant={restaurant} reviews={reviews} />
          <RestaurantTab reviewCount={reviews.length} />
          <div className='detail'>
            <RestaurantInfo restaurant={restaurant} options={options} />
            <RestaurantMenu menus={menus} />
            <RestaurantReview restaurant={restaurant} reviews={reviews} />
          </div>
        </>
      )}
    </div>
  );
};

export default RestaurantDetail;
