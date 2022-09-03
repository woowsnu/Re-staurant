package com.restaurant.app.controller;


import com.restaurant.app.dto.RestaurantDTO;
import com.restaurant.app.model.Restaurant;
import com.restaurant.app.service.RestaurantService;
import com.restaurant.app.service.RestaurantServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/restaurant")
@CrossOrigin("*")
@Slf4j
public class RestaurantController {

    @Autowired
    RestaurantService restaurantService;
    @GetMapping()
    public ResponseEntity<?> findAll(){
        log.error("Restaurant Controller error");
        List<Restaurant> restaurants = restaurantService.findAll();
        List<RestaurantDTO> dtos = restaurants.stream().map(RestaurantDTO::new).collect((Collectors.toList()));
        return ResponseEntity.ok(dtos);

    }


//    @PostMapping
}
