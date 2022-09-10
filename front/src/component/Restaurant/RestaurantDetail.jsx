import React, { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';
import axios from '../../api/axios';
import RestaurantProfile from "./RestaurantProfile";
import RestaurantInfo from "./RestaurantInfo";
import RestaurantMenu from "./RestaurantMenu";
import RestaurantReview from "./RestaurantReview";
import RestaurantTab from "./RestaurantTab";

const RestaurantDetail = () => {
    const [restaurant, setRestaurant] = useState([]);
    const restaurantid = useParams().id;
    
    // restaurant data fetch
    const fetchRestaurantData = async () => {
      try {
        const response = await axios.get(`/restaurant/restaurantDetail/${restaurantid}`);
        setRestaurant(response.data)
      } catch (error) {
        console.error("에러가 발생했습니다. : ", error)
      }
    }
  
    useEffect(() => {
      fetchRestaurantData();
    }, []);
  
    return (
      <div>
        <RestaurantProfile
          restaurant={restaurant}
        />
        {/* <RestaurantTab reviewCount={reviews.length} /> */}
        <RestaurantTab/>
        <div className="detail">
          <RestaurantInfo restaurant={restaurant} />
          {/* <RestaurantMenu menus={menus} /> */}
          {/* <RestaurantReview reviews={reviews} restaurant={restaurant} /> */}
          <Link to={"/review/write/1"}>
            <button>리뷰쓰기</button>
          </Link>
        </div>
      </div>
    );
}

export default RestaurantDetail