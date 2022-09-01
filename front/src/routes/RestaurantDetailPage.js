import React, { useEffect, useState } from "react";
import RestaurantProfile from "../component/Restaurant/RestaurantProfile";
import RestaurantInfo from "../component/Restaurant/RestaurantInfo";
import RestaurantMenu from "../component/Restaurant/RestaurantMenu";
import RestaurantReview from "../component/Restaurant/RestaurantReview";
import RestaurantTab from "../component/Restaurant/RestaurantTab";
import axios from "axios";

const RestaurantDetailPage = () => {
  const [restaurant, setRestaurant] = useState([]);
  const [simpleAddress, setSimpleAddress] = useState([]);
  const [menus, setMenus] = useState([]);
  const [reviews, setReviews] = useState([]);
  // const [goodReviews, setGoodReviews] = useState();
  // const [badReviews, setBadReviews] = useState();

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axios.get("http://localhost:3500/restaurant");
        setRestaurant(response.data[0]);
        const address = response.data[0].address
          .split(" ")
          .splice(0, 2)
          .join(" ");
        setSimpleAddress(address);
        setMenus(response.data[0].menu);
        setReviews(response.data[0].reviews);
        // const goodReviewsData = response.data[0].reviews.filter((el) => el.revisit == 1);
        // const badReviewsData = response.data[0].reviews.filter((el) => el.revisit == 0);
        // setGoodReviews(goodReviewsData);
        // setBadReviews(badReviewsData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRestaurant();
  }, []);
  return (
    <div>
      <RestaurantProfile
        restaurant={restaurant}
        simpleAddress={simpleAddress}
      />
      <RestaurantTab reviewCount={reviews.length} />
      <div className="detail">
        <RestaurantInfo restaurant={restaurant} />
        <RestaurantMenu menus={menus} />
        <RestaurantReview reviews={reviews} restaurant={restaurant} />
      </div>
    </div>
  );
};

export default RestaurantDetailPage;
