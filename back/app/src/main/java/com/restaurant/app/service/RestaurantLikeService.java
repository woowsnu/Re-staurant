package com.restaurant.app.service;


import com.restaurant.app.DTO.RestaurantDTO;
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
import org.springframework.http.ResponseEntity;
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



    @Transactional
    public RestaurantLike  save(User authedUser, RestaurantLikeDTO restaurantLikeDTO) {

        Restaurant restaurant = restaurantRepository.findRestaurantByBusId(restaurantLikeDTO.getBusId());
        RestaurantLike currLike  = restaurantLikeRepository.findRestaurantsLikeByRestaurantBusIdAndUserEmail(restaurantLikeDTO.getBusId(),authedUser.getEmail());
        if (currLike != null) {
            throw new RuntimeException("이미 추가했습니다!");
        }

        RestaurantLike restaurantLike = RestaurantLike.builder()
                .user(authedUser)
                .restaurant(restaurant)
                .likeIndex(restaurantLikeDTO.getLikeIndex())
                .removed(1)
                .build();


        restaurantLikeRepository.save(restaurantLike);


        return restaurantLikeRepository.findRestaurantsLikeByRestaurantBusIdAndUserEmail(restaurantLikeDTO.getBusId(), authedUser.getEmail());

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


    public void delete(User authedUser, Long likeIndex) {

        RestaurantLike currLike = restaurantLikeRepository.findRestaurantsLikeByLikeIndex(likeIndex);

        if (authedUser.getUserIndex() != currLike.getUser().getUserIndex() ) {
            throw new RuntimeException("deleteReview denied. invalid userIndex");
        }
        currLike.setRemoved(0);
        restaurantLikeRepository.save(currLike);



    }

}