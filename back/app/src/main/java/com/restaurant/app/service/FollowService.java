package com.restaurant.app.service;

import com.restaurant.app.DTO.FollowDTO;
import com.restaurant.app.model.Follow;
import com.restaurant.app.model.User;
import com.restaurant.app.repository.FollowRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FollowService {


    private final UserService userService;

    @Autowired
    private final FollowRepository followRepository;


    @Transactional
    public void following(User authedUser, FollowDTO followDTO) {

        // 팔로우 되는 사람[상대방] 조회하여 followedUser 객체에 저장.
        User followedUser = userService.findUserByEmail(followDTO.getFollowingEmail());

        Follow currFollow = followRepository.findFollowByFollowingUserAndFollowedUser(authedUser,followedUser);

        // 현재 로그인 중인 authedUser가 상대방을 이미 follow하고 있는지 확인.
          if (currFollow != null && currFollow.getRemoved() !=0) {
              throw new RuntimeException("이미 상대방을 팔로우 하고 있습니다");
          }

        // unfollow한 상대방을 다시 follow
        if (currFollow != null && currFollow.getRemoved() == 0) {
            currFollow.setRemoved(1);
            return;
        }

        // 본인[authedUser]이 본인[authedUser]을 follow하려고하는지 확인.
        if(authedUser.getUserIndex() == followedUser.getUserIndex()) {
            throw new RuntimeException("자기 자신을 팔로우 할 수 없습니다.");
        }

        // followerList:authedUser[팔로우하는 사람] / followingUser:followedUser[팔로우 되는 사람]에 각각 User 객체 저장.
        // removed:1인 경우 팔로우 상태가 활성화 되어있는 상태.
        Follow follow = new Follow(authedUser,followedUser,1);

        // 저장한 follow 인스턴스 Repository에 저장.
        followRepository.save(follow);
    }

    public void unFollowing(User authedUser, FollowDTO unFollowDTO) {

        // 언팔로우 되는 사람[상대방]
        User unFollowedUser = userService.findUserByEmail(unFollowDTO.getFollowingEmail());

        // 본인[authedUser]이 본인[authedUser]을 unFollow하려고하는지 확인.
        if(authedUser.getUserIndex() == unFollowedUser.getUserIndex()) {
            throw new RuntimeException("자기자신을 언팔로우 할 수 없습니다.");
        }

        // authedUser와 unFollowedUser의 Follow 객체 조회.
        Follow currFollow = followRepository.findFollowByFollowingUserAndFollowedUser(authedUser,unFollowedUser);


        if(currFollow != null &&currFollow.getRemoved() != 1) {
            throw new RuntimeException("이미 언팔로우 상태입니다.");
        }


        // 현재 로그인 중인 authedUser가 상대방을 follow하고 있는 상태인지 확인.
        if(currFollow == null) {
            throw new RuntimeException("언팔로우할 상대가 없습니다.");
        }

        // 팔로우 되어있는 상태라면 removed:0으로 해당 팔로우 객체 비활성화
        currFollow.setRemoved(0);

        // 비활성화된 팔로우 객체 업데이트.
        followRepository.save(currFollow);
    }

    public List<FollowDTO> findFollowByFollowingUser(User authedUser) {
        // 해당 user의 Following현황을 리스트로 저장.
        List<Follow> followingList = followRepository.findFollowByFollowingUser(authedUser);

        // 컨트롤러에 전달하기 위해 List<FollowDTO>형태로 변환하여 객체 전달.
        return followingList.stream().map(FollowDTO::new).collect((Collectors.toList()));
    }

    public List<FollowDTO> findFollowByFollowedUser(User authedUser) {
        // 해당 user의 Following현황을 리스트로 저장.
        List<Follow> followedList = followRepository.findFollowByFollowedUser(authedUser);

        // 컨트롤러에 전달하기 위해 List<FollowDTO>형태로 변환하여 객체 전달.
        return followedList.stream().map(FollowDTO::new).collect((Collectors.toList()));
}

}