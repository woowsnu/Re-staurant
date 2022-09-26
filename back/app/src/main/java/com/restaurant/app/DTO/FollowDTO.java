package com.restaurant.app.DTO;

import com.restaurant.app.model.Follow;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
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