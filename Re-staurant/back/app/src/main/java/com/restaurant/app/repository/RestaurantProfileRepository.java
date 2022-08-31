package com.restaurant.app.repository;

import com.restaurant.app.model.Restaurant;
import com.restaurant.app.model.RestaurantProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RestaurantProfileRepository extends JpaRepository<RestaurantProfile, Long> {

    public RestaurantProfile findByRestaurantProfileIndex(Long index);

}
