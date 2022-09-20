package com.restaurant.app.controller;

import com.restaurant.app.DTO.FollowDTO;
import com.restaurant.app.DTO.ResponseDTO;
import com.restaurant.app.DTO.RestaurantLikeDTO;
import com.restaurant.app.DTO.UserDTO;
import com.restaurant.app.model.Follow;
import com.restaurant.app.model.RestaurantLike;
import com.restaurant.app.model.User;
import com.restaurant.app.service.FollowService;
import com.restaurant.app.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    @Autowired
    private final UserService userService;

    private final FollowService followService;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    // Create User : [회원가입 -> 로그인 필요없는 메서드]
    @PostMapping("/join")
    public ResponseEntity<?> join(@RequestBody UserDTO userDTO) {
        System.out.println("POST요청[/join]: 회원가입 메서드" + userDTO.toString());

        try{
            userService.save(userDTO, bCryptPasswordEncoder);

            ResponseDTO userResponseDTO = ResponseDTO.builder().result(1).build();

            return ResponseEntity.ok().body(userResponseDTO);
        }

        catch(Exception e) {

            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

    // Read_User_Info : 유저 상세정보 [개인정보 + 팔로우/팔로워 + 리뷰게시글 등]

    @Transactional

    // 상대방 유저정보 조회
    @PostMapping("/auth/userInfo")
    public ResponseEntity<?> readCounterProfile(@AuthenticationPrincipal User authedUser,@RequestBody UserDTO userDTO) {


        System.out.println("userController.ReadUserInfo() -> 로그인 중인 사용자: " + authedUser.getEmail());
        
        try {
            User user = userService.findUserByEmail(userDTO.getEmail());

            List<Follow> followingList = followService.findFollowByFollowingUser(user);
            List<FollowDTO> followingDTOList = followingList.stream().map(FollowDTO::new).collect((Collectors.toList()));

            List<Follow> followedList = followService.findFollowByFollowedUser(user);
            List<FollowDTO> followedDTOList = followedList.stream().map(FollowDTO::new).collect((Collectors.toList()));


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

            return ResponseEntity.ok().body(userResponseDTO);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();

            return ResponseEntity.badRequest().body(responseDTO);

        }
    }

//     Update User_Info : 유저 닉네임 수정
    @PutMapping("/auth/update/nickname")
    public ResponseEntity<?> updateUserNickname(@AuthenticationPrincipal User authedUser, @RequestBody UserDTO updateUserDTO) {

        System.out.println("userController.UpdateUserInfo() -> 로그인 중인 사용자: " + authedUser.getEmail());

        try {
            // 로그인된 사용자의 userIndex와 post로 전송된 userIndex가 동일할 경우에만 닉네임 변경 진행.
            User updatedUser = userService.updateNickname(authedUser,updateUserDTO);

            ResponseDTO responseDTO = ResponseDTO.builder().result(1).build();

            return ResponseEntity.ok().body(responseDTO);

        } catch (Exception e) {
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

    //     Update User_Info : 유저 패스워드 수정
    @PutMapping("/auth/update/password")
    public ResponseEntity<?> updateUserInfo(@AuthenticationPrincipal User authedUser, @RequestBody UserDTO updateUserDTO) {

        System.out.println("userController.UpdateUserInfo() -> 로그인 중인 사용자: " + authedUser.getEmail());

        try {
            // 로그인된 사용자의 userIndex와 post로 전송된 userIndex가 동일할 경우에만 개인정보 변경 진행.
            User updatedUser = userService.updatePassword(authedUser,updateUserDTO, bCryptPasswordEncoder);

            ResponseDTO responseDTO = ResponseDTO.builder().result(1).build();

            return ResponseEntity.ok().body(responseDTO);

        } catch (Exception e) {
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

    //     Delete User_Info : 유저 삭제 [탈퇴기능]
    @DeleteMapping("/auth/deleteUserInfo")
    public ResponseEntity<?> deleteUserInfo(@AuthenticationPrincipal User authedUser, @RequestBody UserDTO deleteUserDTO) {

        System.out.println("userController.DeleteUserInfo() -> 로그인 중인 사용자: " + authedUser.getEmail());

        try{

            userService.delete(authedUser,deleteUserDTO);

            ResponseDTO responseDTO = ResponseDTO.builder().result(1).build();

            return ResponseEntity.ok().body(responseDTO);
        }
        catch(Exception e) {
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

    }