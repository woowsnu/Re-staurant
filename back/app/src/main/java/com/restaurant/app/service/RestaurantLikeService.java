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

    public List<RestaurantLike> findAll() {return restaurantLikeRepository.findAll(); }

    @Transactional
    public void save(User authedUser, String busId) {

        Restaurant restaurant = restaurantRepository.findRestaurantByBusId(busId);
        RestaurantLike currLike = restaurantLikeRepository.findRestaurantsLikeByRestaurantBusIdAndUserEmail(busId,authedUser.getEmail());

        if (currLike != null && currLike.getStatusLike() != 0) {
            throw new RuntimeException("이미 좋아요를 누르고 있습니다.");
        }

        // 한번 좋아요를 눌렀다면 비활성화된 statusLike를 다시 활성화.
        if ( currLike != null && currLike.getStatusLike() == 0) {
            currLike.setStatusLike(1);
            return;
        }

        RestaurantLike restaurantLike = RestaurantLike.builder()
                .user(authedUser)
                .restaurant(restaurant)
                .statusLike(1)
                .build();

        restaurantLikeRepository.save(restaurantLike);
    }

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


    public void delete(User authedUser, String busId) {

        RestaurantLike currLike = restaurantLikeRepository.findRestaurantsLikeByRestaurantBusIdAndUserEmail(busId,authedUser.getEmail());

        if (authedUser.getUserIndex() != currLike.getUser().getUserIndex() ) {
            throw new RuntimeException("삭제되지 않았습니다.");
        }

        currLike.setStatusLike(0);
        restaurantLikeRepository.save(currLike);
    }

}