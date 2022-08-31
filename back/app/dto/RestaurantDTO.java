package com.restaurant.app.dto;

import com.restaurant.app.model.Restaurant;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantDTO {

    private Long restaurantIndex;  //레스토랑 아이디
    private String restaurantCategory;   //레스토랑 카테고리

    private int restaurant_profile_restaurant_profile_index;

    public RestaurantDTO(final Restaurant restaurant){

        this.restaurantIndex = restaurant.getRestaurantIndex();
        this.restaurantCategory = restaurant.getRestaurantCategory();
//        this.restaurant_profile_restaurant_profile_index = restaurant.getRestaurant_profile_restaurant_profile_index();
    }

}
