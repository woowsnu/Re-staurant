package com.restaurant.app.DTO;

import com.restaurant.app.model.Follow;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FollowDTO {

    private Long followIndex;

    private String followingEmail;

    private String followedEmail;

    public FollowDTO(Follow follow) {
        this.followIndex = follow.getFollowIndex();
        this.followingEmail = follow.getFollowingUser().getEmail();
        this.followedEmail = follow.getFollowedUser().getEmail();
    }


}
