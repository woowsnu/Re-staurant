package com.restaurant.app.service;


import com.restaurant.app.DTO.RestaurantDTO;
import com.restaurant.app.DTO.RestaurantLikeDTO;
import com.restaurant.app.DTO.ReviewDTO;
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

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

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
    public List<RestaurantLike> save(User authedUser, RestaurantLikeDTO restaurantLikeDTO, String busId) {
        Restaurant restaurant = restaurantRepository.findRestaurantByBusId(busId);

        RestaurantLike restaurantLike = RestaurantLike.builder()
                .user(authedUser)
                .restaurant(restaurant)
                .likeIndex(restaurantLikeDTO.getLikeIndex())
                .build();

        restaurantLike.setUser(authedUser);

        RestaurantLike savedLike = restaurantLikeRepository.save(restaurantLike);
        System.out.println("savedReview" + savedLike);

        return restaurantLikeRepository.findRestaurantsLikeByRestaurantBusId(busId);
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
        RestaurantLike currLike = restaurantLikeRepository.findRestaurantsLikeByLikeIndex(likeIndex);

        if (authedUser.getUserIndex() != currLike.getUser().getUserIndex()) {
            throw new RuntimeException("deleteLike denied. invalid userIndex");
        }

        return restaurantLikeRepository.deleteByLikeIndex(currLike.getLikeIndex());

    }




}