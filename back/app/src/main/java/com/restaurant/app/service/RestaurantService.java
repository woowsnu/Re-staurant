package com.restaurant.app.service;

import com.restaurant.app.DTO.RestaurantDTO;
import com.restaurant.app.model.Restaurant;
import com.restaurant.app.repository.RestaurantRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class RestaurantService {

    @Autowired
    private RestaurantRepository restaurantRepository;
    public List<Restaurant> findAll() {
        return restaurantRepository.findAll();}

    public Restaurant createPlaceInfo(RestaurantDTO restaurantDTO) {

//        if(restaurantRepository.findRestaurantByBusId(restaurantDTO.getBusId()) == null) {
//            throw new RuntimeException("없는 식당이에욤.");
//        }

        Restaurant restaurant = Restaurant.builder()
                                .busId(restaurantDTO.getBusId())
                                .restaurantCategory(restaurantDTO.getRestaurantCategory())
                                .restaurantName(restaurantDTO.getRestaurantName())
                                .fullAddress(restaurantDTO.getFullAddress())
//                                .menuList(restaurantDTO.menuToString())
                                .build();

        return restaurantRepository.save(restaurant);
    }


    public List<Restaurant> findRestaurantByName(String restaurantName){
        List<Restaurant> restaurantList = restaurantRepository.findRestaurantByRestaurantName(restaurantName);

        if (restaurantList.size() == 0) {
            throw new RuntimeException("식당이 없습니다.");
        }

        return restaurantList;
    }


    public Restaurant findRestaurantByBusId(String busId) {
        Restaurant restaurant = restaurantRepository.findRestaurantByBusId(busId);

        if (restaurant == null) {
            throw new RuntimeException("해당 식당이 없습니다.");
        }

        return restaurant;
    }
}
