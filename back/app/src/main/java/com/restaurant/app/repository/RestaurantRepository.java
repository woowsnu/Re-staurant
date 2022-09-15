package com.restaurant.app.repository;

import com.restaurant.app.model.Restaurant;
import com.restaurant.app.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

    List<Restaurant>  findRestaurantByRestaurantName(String restaurantName);

    Restaurant findRestaurantByBusId(Long busId);
//    Restaurant findRestaurantByRestaurantName(String restaurantName);



    List<Restaurant> findRestaurantBySiCode(String siCode);

    List<Restaurant> findRestaurantBysiCodeAndGuCode(String siCode, String guCode);
    List<Restaurant> findRestaurantBySiCodeAndGuCodeAndDongCode(String siCode, String guCode, String dongCdoe);
    List<Restaurant> findByRestaurantCategoryContainingIgnoreCase(String restaurantCategory);

    List<Restaurant> findAll();


}
