package com.restaurant.app.service;
import com.restaurant.app.DTO.RestaurantLikeDTO;
import com.restaurant.app.model.*;
import com.restaurant.app.repository.RestaurantLikeRepository;
import com.restaurant.app.repository.RestaurantRepository;
import com.restaurant.app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@RequiredArgsConstructor
public class RestaurantLikeService {
    @Autowired
    private final RestaurantLikeRepository restaurantLikeRepository;
    private final RestaurantRepository restaurantRepository;

    private final UserRepository userRepository;

    public List<RestaurantLike> save( User authedUser,RestaurantLikeDTO restaurantLikeDTO) {

        Restaurant restaurant = restaurantRepository.findRestaurantByBusId(restaurantLikeDTO.getBusId());

        if (restaurant == null) {
            throw new RuntimeException("해당 식당이 없습니다.");
        }

        RestaurantLike restaurantLike = RestaurantLike.builder()
                .user(authedUser)
                .restaurant(restaurant)
                .likeIndex(restaurantLikeDTO.getLikeIndex())
                .build();

        restaurantLike.setUser(authedUser);
        restaurantLikeRepository.save(restaurantLike);

        return restaurantLikeRepository.findRestaurantsLikeByRestaurantBusId(restaurantLikeDTO.getBusId());

    }


    public Long delete(User authedUser, Long likeIndex) {

        RestaurantLike currLike = restaurantLikeRepository.findRestaurantsLikeByLikeIndex(likeIndex);

        if (authedUser.getUserIndex() != currLike.getUser().getUserIndex()) {
            throw new RuntimeException("deleteLike denied. invalid userIndex");
        }

        return restaurantLikeRepository.deleteByLikeIndex(currLike.getLikeIndex());

    }

}