package com.restaurant.app.service;

import com.restaurant.app.DTO.RestaurantDTO;
import com.restaurant.app.model.Restaurant;
import com.restaurant.app.repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class RestaurantService {

    private final RestaurantRepository restaurantRepository;
    private Restaurant restaurant;
    public List<Restaurant> findAll() {
        return restaurantRepository.findAll();}

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
