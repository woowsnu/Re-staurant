package com.restaurant.app.repository;

import com.restaurant.app.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

    List<Restaurant> findRestaurantByRestaurantName(String restaurantName);

    Restaurant findRestaurantByBusId(String busId);

    List<Restaurant> findAll();
}
