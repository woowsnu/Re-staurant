package com.restaurant.app.controller;

import com.restaurant.app.DTO.FollowDTO;
import com.restaurant.app.DTO.ResponseDTO;
import com.restaurant.app.DTO.UserDTO;
import com.restaurant.app.model.Follow;
import com.restaurant.app.model.User;
import com.restaurant.app.service.FollowService;
import com.restaurant.app.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    @Autowired
    private final UserService userService;

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

    // 상대방 유저정보 조회
    @PostMapping("/auth/userInfo")
    public ResponseEntity<?> readProfile(@AuthenticationPrincipal User authedUser,@RequestBody UserDTO userDTO) {


        System.out.println("userController.ReadUserInfo() -> 로그인 중인 사용자: " + authedUser.getEmail());
        
        try {
            UserDTO userResponseDTO = userService.readProfile(userDTO);

            return ResponseEntity.ok().body(userResponseDTO);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();

            return ResponseEntity.badRequest().body(responseDTO);

        }
    }

//     Update User_Info : 유저 닉네임 수정
    @PutMapping("/auth/updateNickname")
    public ResponseEntity<?> updateUserNickname(@AuthenticationPrincipal User authedUser, @RequestBody UserDTO updateUserDTO) {

        System.out.println("userController.UpdateUserInfo() -> 로그인 중인 사용자: " + authedUser.getEmail());

        try {
            // 로그인된 사용자의 userIndex와 post로 전송된 userIndex가 동일할 경우에만 닉네임 변경 진행.
            userService.updateNickname(authedUser,updateUserDTO);

            ResponseDTO responseDTO = ResponseDTO.builder().result(1).build();

            return ResponseEntity.ok().body(responseDTO);

        } catch (Exception e) {
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

    //     Update User_Info : 유저 패스워드 수정
    @PutMapping("/auth/updatePassword")
    public ResponseEntity<?> updateUserInfo(@AuthenticationPrincipal User authedUser, @RequestBody UserDTO updateUserDTO) {

        System.out.println("userController.UpdateUserInfo() -> 로그인 중인 사용자: " + authedUser.getEmail());

        try {
            // 로그인된 사용자의 userIndex와 post로 전송된 userIndex가 동일할 경우에만 개인정보 변경 진행.
            userService.updatePassword(authedUser,updateUserDTO, bCryptPasswordEncoder);

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