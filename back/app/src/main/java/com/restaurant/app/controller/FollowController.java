package com.restaurant.app.controller;

import com.restaurant.app.DTO.ResponseDTO;
import com.restaurant.app.DTO.UserDTO;
import com.restaurant.app.model.User;
import com.restaurant.app.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("follow")
public class FollowController {

    private final UserService userService;

    private final FollowService followService;

    @PostMapping("/following")
    public ResponseEntity<?> following(@RequestBody UserDTO userDTO) {


        try{
            User currUser = userService.findUserByEmail(userDTO.getEmail());
            User followingUser = userService.findUserByEmail(userDTO.getFollowingEmail());


        }
        catch(Exception e) {
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();

            return ResponseEntity.badRequest().body(responseDTO);

        }

        return null;
    }
}
