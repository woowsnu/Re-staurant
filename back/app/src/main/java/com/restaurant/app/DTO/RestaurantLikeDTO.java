package com.restaurant.app.DTO;

import com.restaurant.app.model.RestaurantLike;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantLikeDTO {

    private Long LikeIndex;

    private String busId;

    private String restaurantName;

    private String email;

    private String nickname;

    private Long restaurantIndex;


    public RestaurantLikeDTO(RestaurantLike restaurantLike){
        this.LikeIndex = restaurantLike.getLikeIndex();
        this.busId = restaurantLike.getRestaurant().getBusId();
        this.restaurantName = restaurantLike.getRestaurant().getRestaurantName();
        this.email = restaurantLike.getUser().getEmail();
        this.nickname = restaurantLike.getUser().getNickname();
        this.restaurantIndex = restaurantLike.getRestaurant().getRestaurantIndex();

    }

}
