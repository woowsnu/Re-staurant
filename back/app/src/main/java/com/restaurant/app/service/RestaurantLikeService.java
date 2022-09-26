package com.restaurant.app.service;
import com.restaurant.app.DTO.RestaurantLikeDTO;
import com.restaurant.app.model.*;
import com.restaurant.app.repository.RestaurantLikeRepository;
import com.restaurant.app.repository.RestaurantRepository;
import com.restaurant.app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
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

        @Transactional
        public RestaurantLike save(User authedUser, RestaurantLikeDTO restaurantLikeDTO) {

            Restaurant restaurant = restaurantRepository.findRestaurantByBusId(restaurantLikeDTO.getBusId());
            RestaurantLike currLike = restaurantLikeRepository.findRestaurantsLikeByRestaurantBusIdAndUserEmail(restaurantLikeDTO.getBusId(), authedUser.getEmail());

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


                public void delete(User authedUser, Long likeIndex) {

                    RestaurantLike currLike = restaurantLikeRepository.findRestaurantsLikeByLikeIndex(likeIndex);

                    if (authedUser.getUserIndex() != currLike.getUser().getUserIndex()) {
                        throw new RuntimeException("deleteLike denied. invalid userIndex");
                    }
                    currLike.setRemoved(0);
                    restaurantLikeRepository.save(currLike);

                }

            }