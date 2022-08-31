package com.restaurant.app.controller;

import com.restaurant.app.DTO.ResponseDTO;
import com.restaurant.app.DTO.UserDTO;
import com.restaurant.app.config.auth.PrincipalDetails;
import com.restaurant.app.model.User;
import com.restaurant.app.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {


    @Autowired
    private final UserService userService;

    // Read_User_Info : 유저 상세정보 [개인정보 + 팔로우/팔로워 + 리뷰게시글 등]
    @GetMapping("/info")
    public ResponseEntity<?> ReadUserInfo(@AuthenticationPrincipal PrincipalDetails principalDetails) {

        User user = principalDetails.getUser();

        System.out.println("userController.ReadUserInfo() : " + user.toString());

        try {

            UserDTO userResponseDTO = UserDTO.builder()
                    .userIndex(user.getUserIndex())
                    .email(user.getEmail())
                    .roles(user.getRoles())
                    .username(user.getUsername())
                    .reviewList(user.reviewListToString())
                    .build();

            return ResponseEntity.ok().body(userResponseDTO);
        } catch (Exception e) {
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();

            return ResponseEntity.badRequest().body(responseDTO);

        }
    }

    // Update User_Info
//    @PostMapping("/updateInfo")
//    public ResponseEntity<?> updateUserInfo(@RequestBody UserDTO userDTO) {
//        System.out.println("userController.UpdateUserInfo() : " + userDTO.toString());
//
//        try {
//            User user = userService.findUserByEmail(userDTO.getEmail());
//
////            User
//
//        }
//        catch(Exception e) {
//
//        }
//
//        }
}