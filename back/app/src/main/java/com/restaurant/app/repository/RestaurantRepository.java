package com.restaurant.app.repository;

import com.restaurant.app.DTO.RestaurantDTO;
import com.restaurant.app.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long>, JpaSpecificationExecutor<Restaurant> {

    Restaurant findRestaurantByBusId(String busId);
    List<Restaurant> findRestaurantByRestaurantNameContainingIgnoreCase(String restaurantName);



    List<Restaurant> findRestaurantBySiCode(String siCode);


    List<Restaurant> findRestaurantBySiCodeAndGuCode(String siCode, String guCode);
    List<Restaurant> findRestaurantBySiCodeAndGuCodeAndDongCode(String siCode, String guCode, String dongCode);



    List<Restaurant> findAll();
    List<Restaurant> findByRestaurantNameContainingOrLargeCategoryContainingOrMidCategoryContaining(String restaurantName, String largeCategory, String midCategory );

////    Optional<Restaurant> findByRestaurantNameOryLargeCategoryContainingOrMidCategory(String restaurantName, String largeCategory, String midCategory );
//Optional<Restaurant> findByRestaurantName(String restaurantName );

}
