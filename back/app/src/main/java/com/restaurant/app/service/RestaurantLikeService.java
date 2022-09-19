package com.restaurant.app.service;


import com.restaurant.app.DTO.RestaurantLikeDTO;
import com.restaurant.app.model.Restaurant;
import com.restaurant.app.model.RestaurantLike;
import com.restaurant.app.model.Review;
import com.restaurant.app.model.User;
import com.restaurant.app.repository.RestaurantLikeRepository;
import com.restaurant.app.repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class RestaurantLikeService {
    private final RestaurantRepository restaurantRepository;

    @Autowired
    private final RestaurantLikeRepository restaurantLikeRepository;


    @Transactional
    public List<RestaurantLike> findAll() {return restaurantLikeRepository.findAll(); }

    public List<RestaurantLike> save(User authedUser, RestaurantLikeDTO restaurantLikeDTO ) {
        Restaurant restaurant = restaurantRepository.findRestaurantByBusId(restaurantLikeDTO.getBusId());
        List<RestaurantLike> restaurantLikes = restaurantLikeRepository.findRestaurantsLikeByUser(authedUser);
        if (restaurant == null) {
            throw new RuntimeException("해당 식당이 없습니다.");
        }

        RestaurantLike restaurantLike = RestaurantLike.builder()
                .likeIndex(restaurantLikeDTO.getLikeIndex())
                .user(authedUser)
                .restaurant(restaurant)
                .build();

        restaurantLike.setUser(authedUser);

        restaurantLikeRepository.save(restaurantLike);
//        System.out.println("savedrestaurantReview" + restaurantLike);

        return restaurantLikeRepository.findRestaurantsLikeByRestaurantBusId(restaurantLikeDTO.getBusId());
    }

    @Transactional
    public List<RestaurantLike> findByEmail(User authedUser,String email){
        List<RestaurantLike> restaurantLike = restaurantLikeRepository.findRestaurantsLikeByUserEmail(email);
        List<RestaurantLike> restaurantLikes = restaurantLikeRepository.findRestaurantsLikeByUser(authedUser);
        return restaurantLike;
    }

    public List<RestaurantLike> findRestaurantLikeByUser(User authedUser,String busId){
        Restaurant restaurant = restaurantRepository.findRestaurantByBusId(busId);
        List<RestaurantLike> restaurantLikes = restaurantLikeRepository.findRestaurantsLikeByUser(authedUser);
        return restaurantLikes;
    }

    public Long delete(User authedUser, Long likeIndex) {
        RestaurantLike currLike = restaurantLikeRepository.findLikeByLikeIndex(likeIndex);

        if (authedUser.getUserIndex() != currLike.getUser().getUserIndex()) {
            throw new RuntimeException("deleteReview denied. invalid userIndex");
        }

        return restaurantLikeRepository.deleteByLikeIndex(currLike.getLikeIndex());

    }


}