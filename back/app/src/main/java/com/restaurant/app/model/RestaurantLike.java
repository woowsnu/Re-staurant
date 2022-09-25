package com.restaurant.app.model;

import com.restaurant.app.DTO.RestaurantLikeDTO;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Builder
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantLike implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "restaurant_like_index")
    private Long likeIndex;

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = User.class)
    @JoinColumn(name = "user_index",referencedColumnName = "user_index")
    private User user;
    @ManyToOne(fetch = FetchType.LAZY, targetEntity = Restaurant.class)
    @JoinColumn(name = "restaurant_index",referencedColumnName = "restaurant_index")
    private Restaurant restaurant;

    @Override
    public String toString() {
        return "{ restaurantLikeIndex :" + likeIndex
                +", RestaurantIndex : "+ restaurant.getRestaurantIndex()
                + ",restaurantName:" +restaurant.getRestaurantName()
                + ",userIndex" + user.getUserIndex()
                + ", email : " + user.getEmail() + ", nickname : " +user.getNickname() +  "}" ;
    }

}