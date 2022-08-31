package com.restaurant.app.service;

import com.restaurant.app.model.Restaurant;
import com.restaurant.app.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RestaurantServiceImpl {


    @Autowired
    private RestaurantRepository restaurantRepository;

    private Restaurant restaurant;

    public Restaurant findByIndex(Long index){
        try {
            restaurant = restaurantRepository.findRestaurantByRestaurantIndex(index);
        } catch (NullPointerException e) {
            throw new RuntimeException("잘못된 가게 정보입니다");
        }
        return restaurant;
    }

    public  List<Restaurant> findAll(){
        return restaurantRepository.findAll();
    }

}
