package com.restaurant.app.service;

import com.restaurant.app.DTO.UserDTO;
import com.restaurant.app.model.User;
import com.restaurant.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    // Create UserInfo
    public User save(User user) {

        if(userRepository.findUserByEmail(user.getEmail()) != null) {
            throw new RuntimeException("등록된 이메일입니다.");
        }

        System.out.println("회원가입 완료.");
        return userRepository.save(user);
    }

    // Update UserInfo
    public User update(User authedUser, UserDTO updateUserDTO,BCryptPasswordEncoder bCryptPasswordEncoder) {

         User updatedUser = userRepository.save(User.builder()
                .userIndex(authedUser.getUserIndex()) // userIndex는 변경불가.
                .email(authedUser.getEmail()) // email도 변경불가.
                .nickname(updateUserDTO.getNickname()) // 닉네임 변경
                .password(bCryptPasswordEncoder.encode(updateUserDTO.getPassword())) // 패스워드 변경
                .roles("ROLE_USER")
                .reviewList(authedUser.getReviewList())
                .followerList(authedUser.getFollowerList())
                .followingList(authedUser.getFollowingList())
                .build());

        return updatedUser;
    }

    public User findUserByEmail(String userEmail) {
        if(userRepository.findUserByEmail(userEmail) == null) {
            throw new RuntimeException("invalid userEmail");
        }
        return userRepository.findUserByEmail(userEmail);
    }
}
