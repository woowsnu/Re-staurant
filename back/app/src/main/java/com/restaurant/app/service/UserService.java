package com.restaurant.app.service;

import com.restaurant.app.DTO.FollowDTO;
import com.restaurant.app.DTO.UserDTO;
import com.restaurant.app.model.Follow;
import com.restaurant.app.model.User;
import com.restaurant.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    // Create UserInfo
    public void save(UserDTO userDTO, BCryptPasswordEncoder bCryptPasswordEncoder) {

        // 전달받은 userDTO 객체를 이용해 User 객체 생성 및 데이터 세팅.
        User user = User.builder()
                .email(userDTO.getEmail())
                .nickname(userDTO.getNickname())
                .password(bCryptPasswordEncoder.encode(userDTO.getPassword()))
                .createDate(LocalDateTime.now())
                .roles("ROLE_USER").build();

        // 이미 등록이 되어있는지 확인.
        if(userRepository.findUserByEmail(user.getEmail()) != null) {
            throw new RuntimeException("등록된 이메일입니다.");
        }
        // 등록되어 있지 않은 경우 해당 user객체 DB저장.
        userRepository.save(user);
    }

    public UserDTO readProfile(User user, List<FollowDTO> followingDTOList, List<FollowDTO> followedDTOList) {
        // 전달받은 user, followingList,followedList 객체를 선언한 userResponseDTO에 모두 저장하여 반환.

        UserDTO userResponseDTO = UserDTO.builder()
                .userIndex(user.getUserIndex())
                .email(user.getEmail())
//                    .password(user.getPassword())
                .nickname(user.getNickname())
                .roles(user.getRoles())
                .reviewList(user.reviewList(user.getReviewList()))
                .restaurantLikeList(user.restaurantLikeList(user.getRestaurantLikeList()))
                .followingList(followingDTOList)
                .followerList(followedDTOList)
                .build();

        return userResponseDTO;
    }

    // Update UserNickname
    public void updateNickname(User authedUser, UserDTO updateUserDTO) {
        // 현재 로그인한 계정과 업데이트할 계정의 user_index가 일치하는지 확인.
        if (authedUser.getUserIndex() != findUserByEmail(updateUserDTO.getEmail()).getUserIndex()) {
            throw new RuntimeException("현재 로그인한 계정과 업데이트할 계정이 일치하지 않습니다.");
        }
        // 일치할 경우, 현재 로그인한 유저의 nickname 변경
        authedUser.setNickname(updateUserDTO.getNickname());
        userRepository.save(authedUser);
    }

    // Update UserPassword
    public User updatePassword(User authedUser, UserDTO updateUserDTO,BCryptPasswordEncoder bCryptPasswordEncoder) {
        // 현재 로그인한 계정과 업데이트할 계정의 user_index가 일치하는지 확인.
        if (authedUser.getUserIndex() != findUserByEmail(updateUserDTO.getEmail()).getUserIndex()) {
            throw new RuntimeException("현재 로그인한 계정과 업데이트할 계정이 일치하지 않습니다.");
        }
        // 일치할 경우, 현재 로그인한 유저의 password 변경
        authedUser.setPassword(bCryptPasswordEncoder.encode(updateUserDTO.getPassword()));
        return userRepository.save(authedUser);
    }

    // Delete UserInfo
    public Long delete(User authedUser, UserDTO deleteUserDTO) {
        // 현재 로그인한 계정과 업데이트할 계정의 user_index가 일치하는지 확인.
        if (authedUser.getUserIndex() != userRepository.findUserByEmail(deleteUserDTO.getEmail()).getUserIndex()) {
            throw new RuntimeException("현재 로그인한 계정과 삭제할 계정이 일치하지 않습니다.");
        }
        // 일치할 경우, 현재 로그인한 유저 삭제.
        return userRepository.deleteUserByUserIndex(authedUser.getUserIndex());
    }

    public User findUserByEmail(String email) {

        if (userRepository.findUserByEmail(email) == null) {
            throw new RuntimeException("invalid email");
        }

        return userRepository.findUserByEmail(email);
    }
}
