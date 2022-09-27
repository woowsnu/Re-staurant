package com.restaurant.app.DTO;

import com.restaurant.app.model.RestaurantLike;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class RestaurantLikeDTO {

    private Long LikeIndex;

    private String busId;

    private String restaurantName;

    private String email;

    private String nickname;

    private Long restaurantIndex;

    private Integer statusLike;

    public RestaurantLikeDTO(RestaurantLike restaurantLike){
        this.LikeIndex = restaurantLike.getLikeIndex();
        this.busId = restaurantLike.getRestaurant().getBusId();
        this.restaurantName = restaurantLike.getRestaurant().getRestaurantName();
        this.email = restaurantLike.getUser().getEmail();
        this.nickname = restaurantLike.getUser().getNickname();
        this.restaurantIndex = restaurantLike.getRestaurant().getRestaurantIndex();
        this.statusLike = restaurantLike.getStatusLike();
    }

}