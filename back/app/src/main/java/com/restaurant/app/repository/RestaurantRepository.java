package com.restaurant.app.repository;

import com.restaurant.app.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

    Restaurant findRestaurantByBusId(String busId);
    List<Restaurant> findRestaurantByRestaurantNameContainingIgnoreCase(String restaurantName);

    // siCode 조회
    List<Restaurant> findRestaurantBySiCode(String siCode);

    // guCode 조회
    List<Restaurant> findRestaurantByGuCode(String guCode);

    // dongCode 조회
    List<Restaurant> findRestaurantByDongCode(String dongCode);

    // siCode, guCode 조회
    List<Restaurant> findRestaurantBySiCodeAndGuCode(String siCode,String guCode);

    // siCode, dongCode 조회
    List<Restaurant> findRestaurantBySiCodeAndDongCode(String siCode,String dongCode);

    // guCode, dongCode 조회
    List<Restaurant> findRestaurantByGuCodeAndDongCode(String guCode,String dongCode);

    // siCode, guCode, dongCode 조회
    List<Restaurant> findRestaurantBySiCodeAndGuCodeAndDongCode(String siCode, String guCode, String dongCode);

    List<Restaurant> findTop10AllByOrderByAuthorCountDesc();


    List<Restaurant> findRestaurantByRestaurantCategoryContainingIgnoreCase(String restaurantCategory);
    List<Restaurant> findRestaurantByRestaurantCategoryContainingIgnoreCaseOrRestaurantNameContainingIgnoreCase(String restaurantCategory, String  restaurantName);

    List<Restaurant> findAll();



}
