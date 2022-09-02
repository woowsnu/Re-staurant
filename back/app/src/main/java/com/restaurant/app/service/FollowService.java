package com.restaurant.app.service;

import com.restaurant.app.DTO.FollowDTO;
import com.restaurant.app.model.User;
import com.restaurant.app.repository.FollowRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FollowService {


    private final UserService userService;

    @Autowired
    private final FollowRepository followRepository;

    public User following(User authedUser, FollowDTO followDTO) {

        String authedEmail = authedUser.getEmail();

        // 팔로우 되는 사람[상대방]
        User counterUser = userService.findUserByEmail(followDTO.getEmail());

        // 팔로우 하는 본인[로그인 하는 유저]
//        Follow following = followRepository.findFollowByEmail(authedEmail);

        // 팔로우 당하는 상대방[followDTO에 담긴 유저]
//        Follow follower = followRepository.findFollowByEmail(followDTO.getEmail());

//        following.setFollowingUser(counterUser);

//        follower.setFollowerUser(authedUser);

//        followRepository.save(following);
//        followRepository.save(follower);
        return userService.findUserByEmail(authedEmail);
    }
}
