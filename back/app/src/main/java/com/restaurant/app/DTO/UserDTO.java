package com.restaurant.app.DTO;

import com.restaurant.app.model.User;
import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class UserDTO {

    private Long userIndex;
    private String email;
    private String followingEmail;
    private String nickname;
    private String roles;
    private List<ReviewDTO> reviewList;
    private List<FollowDTO> followingList;
    private List<FollowDTO> followerList;
    private String password;

    private List<RestaurantLikeDTO> restaurantLikeList;

    private List<ReviewPhotoDTO> reviewPhotoList;

    public UserDTO(User user) {
        this.userIndex = user.getUserIndex();
        this.email = user.getEmail();
        this.nickname = user.getNickname();
        this.roles = user.getRoles();

        this.reviewList = user.reviewList(user.getReviewList());
        this.restaurantLikeList = user.restaurantLikeList(user.getRestaurantLikeList());
//        this.followingList = user.followerList(user.getFollowerList());
//        this.followerList = user.followerList(user.getFollowerList());
        this.reviewPhotoList = user.reviewPhotoList(user.getReviewPhotoList());
    }
}
