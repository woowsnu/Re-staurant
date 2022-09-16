package com.restaurant.app.DTO;

import com.restaurant.app.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
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


    public UserDTO(User user) {
        this.userIndex = user.getUserIndex();
        this.email = user.getEmail();
        this.nickname = user.getNickname();
        this.roles = user.getRoles();
        this.reviewList = user.reviewList(user.getReviewList());
//        this.followingList = user.followerList(user.getFollowerList());
//        this.followerList = user.followerList(user.getFollowerList());
    }
}
