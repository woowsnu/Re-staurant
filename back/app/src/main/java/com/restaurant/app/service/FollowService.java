package com.restaurant.app.service;
import com.restaurant.app.DTO.FollowDTO;
import com.restaurant.app.model.Follow;
import com.restaurant.app.model.User;
import com.restaurant.app.repository.FollowRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
@RequiredArgsConstructor
public class FollowService {
    private final UserService userService;
    @Autowired
    private final FollowRepository followRepository;
    public User following(User authedUser, FollowDTO followDTO) {
        // 팔로우 되는 사람[상대방]
        User followedUser = userService.findUserByEmail(followDTO.getFollowingEmail());
        // 현재 로그인 중인 authedUser가 상대방을 이미 follow하고 있는지 확인.
        if(followRepository.findFollowByFollowingUserAndFollowedUser(authedUser,followedUser) != null) {
            throw new RuntimeException("This following is already exist.");
        }
        // 본인[authedUser]이 본인[authedUser]을 follow하려고하는지 확인.
        if(authedUser.getUserIndex() == followedUser.getUserIndex()) {
            throw new RuntimeException("You can't follow yourself.");
        }

        // followerList:authedUser / followingUser:followedUser에 각각 User 객체 저장.
        Follow follow = new Follow(authedUser,followedUser,1);

        // 저장한 follow 인스턴스 Repository에 저장.
        Follow savedFollow = followRepository.save(follow);
        System.out.println("savedFollow" + savedFollow);
        return null;
    }
    public User unFollowing(User authedUser, FollowDTO unFollowDTO) {
//        // 언팔로우 되는 사람[상대방]
        User unFollowedUser = userService.findUserByEmail(unFollowDTO.getFollowingEmail());
        // 본인[authedUser]이 본인[authedUser]을 unFollow하려고하는지 확인.
        if(authedUser.getUserIndex() == unFollowedUser.getUserIndex()) {
            throw new RuntimeException("You can't unFollow yourself.");
        }
        // authedUser와 unFollowedUser의 Follow 객체 조회.
        Follow currFollow = followRepository.findFollowByFollowingUserAndFollowedUser(authedUser,unFollowedUser);
        // 현재 로그인 중인 authedUser가 상대방을 follow하고 있는 상태인지 확인.
        if(currFollow == null) {
            throw new RuntimeException("언팔로우할 상대가 없습니다.");
        }

        currFollow.setRemoved(0);

        System.out.println("====== delete되는지 확인.");
        System.out.println("currFollow Idx: " + currFollow.getFollowIndex());

        followRepository.save(currFollow);
        System.out.println("deletedFollow");

        return null;
    }
    public List<Follow> findFollowByFollowingUser(User authedUser) {
        return followRepository.findFollowByFollowingUser(authedUser);
    }
    public List<Follow> findFollowByFollowedUser(User authedUser) {
        return followRepository.findFollowByFollowedUser(authedUser);
    }
}