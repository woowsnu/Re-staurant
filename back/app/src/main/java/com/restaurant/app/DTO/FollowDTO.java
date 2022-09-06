package com.restaurant.app.DTO;

import com.restaurant.app.model.Follow;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FollowDTO {

    private Long followIndex;
    private String email;

    private Set<Follow> followingList;

    public FollowDTO(Follow follow) {
        this.followIndex = follow.getFollowIndex();
        this.email = follow.getFollowingUser().getEmail();

    }


}
