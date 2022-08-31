package com.restaurant.app.controller;


import com.restaurant.app.dto.RestaurantDTO;
import com.restaurant.app.model.Restaurant;
import com.restaurant.app.service.RestaurantServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/restaurant")
@CrossOrigin("*")
public class RestaurantController {

    @Autowired
    RestaurantServiceImpl restaurantServiceImpl;

    @GetMapping
    public List<Restaurant> findAll() {

        return restaurantServiceImpl.findAll();
    }

//    @PostMapping
}
