package com.restaurant.app.service;

import com.restaurant.app.DTO.FollowDTO;
import com.restaurant.app.model.Follow;
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

        // 팔로우 되는 사람[상대방]
        User followedUser = userService.findUserByEmail(followDTO.getEmail());

        // 현재 로그인 중인 authedUser가 상대방을 이미 follow하고 있는지 확인.
        if(followRepository.findFollowByFollowingUserAndFollowedUser(authedUser,followedUser) != null) {
            throw new RuntimeException("This following is already exist.");
        }

        // 본인[authedUser]이 본인[authedUser]을 follow하려고하는지 확인.
        if(authedUser.getUserIndex() == followedUser.getUserIndex()) {
            throw new RuntimeException("You can't follow yourself.");
        }

        // followerList:authedUser / followingUser:followedUser에 각각 User 객체 저장.
        Follow follow = new Follow(authedUser,followedUser);

        // 저장한 follow 인스턴스 Repository에 저장.
        Follow savedFollow = followRepository.save(follow);

        System.out.println("savedFollow" + savedFollow);

        return null;
    }
}
