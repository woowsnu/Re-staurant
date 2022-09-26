package com.restaurant.app.model;


import com.restaurant.app.DTO.FollowDTO;
import com.restaurant.app.DTO.RestaurantLikeDTO;
import com.restaurant.app.DTO.ReviewDTO;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

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
    private String nickname;
    @Column
    private String roles;

    @Column
    private String password;

    @Column(columnDefinition = "TEXT")
    private String accessToken;

    @Column(columnDefinition = "TEXT")
    private String refreshToken;


    @OneToMany(fetch = FetchType.EAGER, mappedBy="user", cascade = CascadeType.ALL)
    private Set<Review> reviewList = new HashSet<>();

    @OneToMany(fetch = FetchType.EAGER, mappedBy="followingUser",cascade = CascadeType.ALL)
    private Set<Follow> followingList = new HashSet<>();

    @OneToMany(fetch = FetchType.EAGER, mappedBy="followedUser",cascade = CascadeType.ALL)
    private Set<Follow> followerList = new HashSet<>();

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<RestaurantLike> restaurantLikeList = new HashSet();


    @CreatedDate
    private LocalDateTime createDate;

    public List<String> getRoleList() {
        if(this.roles.length() > 0) {
            return Arrays.asList(this.roles.split(","));
        }

        return new ArrayList<>();
    }

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





}