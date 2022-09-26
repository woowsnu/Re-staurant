package com.restaurant.app.repository;


import com.restaurant.app.model.Restaurant;
import com.restaurant.app.model.RestaurantLike;
import com.restaurant.app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
;

@Repository
public interface RestaurantLikeRepository extends JpaRepository<RestaurantLike, Long> {
    @Transactional
    List<RestaurantLike> findAll();

    List<RestaurantLike> findRestaurantsLikeByUser(User authedUser);

    @Transactional
    public Long deleteRestaurantLikeByLikeIndex(Long likeIndex);

    List<RestaurantLike> findRestaurantsLikeByUserEmail(String email);

    @Transactional
    public Long deleteByLikeIndex(Long likeIndex);

    public RestaurantLike findRestaurantsLikeByLikeIndex(Long likeIndex);


    List<RestaurantLike> findRestaurantsLikeByRestaurantBusId(String busId);


//    @Transactional
    @Transactional
    RestaurantLike findRestaurantsLikeByRestaurantBusIdAndUserEmail(String busId, String email);


    List<RestaurantLike> findRestaurantsLikeByRestaurantRestaurantIndexAndUserEmail(Long restaurantIndex, String email);
}

