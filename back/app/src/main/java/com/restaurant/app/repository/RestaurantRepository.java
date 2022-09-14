package com.restaurant.app.repository;

import com.restaurant.app.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

    List<Restaurant> findRestaurantByRestaurantName(String restaurantName);

    Restaurant findRestaurantByBusId(String busId);

    List<Restaurant> findRestaurantBySiCode(String siCode);

    List<Restaurant> findRestaurantBysiCodeAndGunCode(String siCode, String gunCode);
    List<Restaurant> findRestaurantBysiCodeAndGunCodeAndGuCode(String siCode, String gunCode, String guCode);
    List<Restaurant> findRestaurantByrestaurantCategory(String restaurantCategory);
    List<Restaurant> findAll();
}
