package com.restaurant.app.controller;

import com.restaurant.app.DTO.ResponseDTO;
import com.restaurant.app.DTO.UserDTO;
import com.restaurant.app.model.User;
import com.restaurant.app.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {


    @Autowired
    private final UserService userService;

    // Read_User_Info
    @PostMapping("/info")
    public ResponseEntity<?> ReadUserInfo(@RequestBody UserDTO userDTO) {
        System.out.println("userController.ReadUserInfo() : " + userDTO.toString());

        try {

            User user = userService.findUserByEmail(userDTO.getEmail());

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