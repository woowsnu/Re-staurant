package com.restaurant.app.service;

import com.restaurant.app.DTO.UserDTO;
import com.restaurant.app.model.User;
import com.restaurant.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    // Create UserInfo
    public User save(UserDTO userDTO, BCryptPasswordEncoder bCryptPasswordEncoder) {

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
        return userRepository.save(user);
    }

    // Update UserNickname
    public User updateNickname(User authedUser, UserDTO updateUserDTO) {

         authedUser.setNickname(updateUserDTO.getNickname());

        return userRepository.save(authedUser);
    }

    // Update UserPassword
    public User updatePassword(User authedUser, UserDTO updateUserDTO,BCryptPasswordEncoder bCryptPasswordEncoder) {

        authedUser.setPassword(bCryptPasswordEncoder.encode(updateUserDTO.getPassword()));

        return userRepository.save(authedUser);
    }

    // Delete UserInfo
    public Long delete(User authedUser, UserDTO deleteUserDTO) {

        User deleteUser = userRepository.findUserByEmail(deleteUserDTO.getEmail());

        if (authedUser.getUserIndex() != deleteUser.getUserIndex()) {
            throw new RuntimeException("deleteUser denied. invalid user_index");
        }

        return userRepository.deleteUserByUserIndex(deleteUser.getUserIndex());
    }

    public User findUserByEmail(String email) {

        if (userRepository.findUserByEmail(email) == null) {
            throw new RuntimeException("invalid email");
        }

        return userRepository.findUserByEmail(email);
    }
}
