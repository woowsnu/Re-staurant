package com.restaurant.app.model;


import com.restaurant.app.DTO.FollowDTO;
import com.restaurant.app.DTO.RestaurantLikeDTO;
import com.restaurant.app.DTO.ReviewDTO;
import lombok.*;

import javax.persistence.*;
<<<<<<< HEAD
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
=======
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;
>>>>>>> b48e3904361b2f450f0a8d0191fec223963c7e33

@Entity
@Builder
@Getter @Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_index")
    private Long userIndex;

    @Column
    private String email;

    @Column
    private String username;

    @Column
    private String roles;

    @Column
    private String password;

<<<<<<< HEAD
=======
    @Column
    private String accessToken;

    @Column
    private String refreshToken;


    @OneToMany(fetch = FetchType.EAGER, mappedBy="user", cascade = CascadeType.ALL)
    private Set<Review> reviewList = new HashSet<>();

    @OneToMany(fetch = FetchType.EAGER, mappedBy="followingUser",cascade = CascadeType.ALL)
    private Set<Follow> followingList = new HashSet<>();

    @OneToMany(fetch = FetchType.EAGER, mappedBy="followedUser",cascade = CascadeType.ALL)
    private Set<Follow> followerList = new HashSet<>();

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "user", cascade = CascadeType.ALL)
    private Set<RestaurantLike> restaurantLikeList = new HashSet();


    @CreatedDate
    private LocalDateTime createDate;

>>>>>>> b48e3904361b2f450f0a8d0191fec223963c7e33
    public List<String> getRoleList() {
        if(this.roles.length() > 0) {
            return Arrays.asList(this.roles.split(","));
        }

        return new ArrayList<>();
    }

<<<<<<< HEAD
=======
    public List<ReviewDTO> reviewList(Set<Review> reviewList){

        List<ReviewDTO> reviewDTOList = reviewList.stream().map(ReviewDTO::new).collect((Collectors.toList()));

        return reviewDTOList;
    }

    public List<FollowDTO> followingList(Set<Follow> followingList){

        List<FollowDTO> followingDTOList = followingList.stream().map(FollowDTO::new).collect((Collectors.toList()));

        return followingDTOList;
    }

    public List<FollowDTO> followerList(Set<Follow> followerList){

        List<FollowDTO> followerDTOList = followerList.stream().map(FollowDTO::new).collect((Collectors.toList()));

        return followerDTOList;
    }

    public List<RestaurantLikeDTO> restaurantLikeList(Set<RestaurantLike> restaurantLikeList){
        List<RestaurantLikeDTO> restaurantLikeDTOList = restaurantLikeList.stream().map(RestaurantLikeDTO::new).collect((Collectors.toList()));
        return restaurantLikeDTOList;
    }



>>>>>>> b48e3904361b2f450f0a8d0191fec223963c7e33


}
