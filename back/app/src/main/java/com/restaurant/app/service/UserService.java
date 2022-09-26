package com.restaurant.app.service;

import com.restaurant.app.DTO.FollowDTO;
import com.restaurant.app.DTO.UserDTO;
import com.restaurant.app.model.User;
import com.restaurant.app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    @Autowired
    private UserRepository userRepository;

    private final FollowService followService;

    // Create UserInfo
    public void save(UserDTO userDTO, BCryptPasswordEncoder bCryptPasswordEncoder) {

        User user = User.builder()
                .email(userDTO.getEmail())
                .nickname(userDTO.getNickname())
                .password(bCryptPasswordEncoder.encode(userDTO.getPassword()))
                .createDate(LocalDateTime.now())
                .roles("ROLE_USER").build();

        if(userRepository.findUserByEmail(user.getEmail()) != null) {
            throw new RuntimeException("등록된 이메일입니다.");
        }

        System.out.println("회원가입 완료.");
        userRepository.save(user);
    }

    public UserDTO readProfile(UserDTO userDTO) {

        User user = findUserByEmail(userDTO.getEmail());

        List<FollowDTO> followingDTOList = followService.findFollowByFollowingUser(user);
        List<FollowDTO> followedDTOList = followService.findFollowByFollowedUser(user);

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

         authedUser.setNickname(updateUserDTO.getNickname());

        userRepository.save(authedUser);
    }

    // Update UserPassword
    public void updatePassword(User authedUser, UserDTO updateUserDTO,BCryptPasswordEncoder bCryptPasswordEncoder) {

        authedUser.setPassword(bCryptPasswordEncoder.encode(updateUserDTO.getPassword()));

        userRepository.save(authedUser);
    }

    // Delete UserInfo
    public void delete(User authedUser, UserDTO deleteUserDTO) {

        User deleteUser = findUserByEmail(deleteUserDTO.getEmail());

        if (authedUser.getUserIndex() != deleteUser.getUserIndex()) {
            throw new RuntimeException("deleteUser denied. invalid user_index");
        }

        userRepository.deleteUserByUserIndex(deleteUser.getUserIndex());
    }

    public User findUserByEmail(String email) {

        if (userRepository.findUserByEmail(email) == null) {
            throw new RuntimeException("invalid email");
        }

        return userRepository.findUserByEmail(email);
    }
}
