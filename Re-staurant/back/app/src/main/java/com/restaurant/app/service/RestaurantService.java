package com.restaurant.app.service;

import org.springframework.http.ResponseEntity;

public interface RestaurantService {
    ResponseEntity<?> findAllByProfile(Long restaurantIndex);
}
