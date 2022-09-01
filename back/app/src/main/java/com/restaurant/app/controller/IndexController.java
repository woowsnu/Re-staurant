package com.restaurant.app.controller;

import com.restaurant.app.DTO.ResponseDTO;
import com.restaurant.app.DTO.UserDTO;
import com.restaurant.app.model.User;
import com.restaurant.app.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/")
public class IndexController {

    /*
        인증을 거치지 않는 컨트롤러[로그인을 하지 않아도 접근이 가능함]
    */

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    private final UserService userService;

    // 회원가입
    @PostMapping("/join")
    public ResponseEntity<?> join(@RequestBody UserDTO userDTO) {
        System.out.println("POST요청[/join]: 회원가입 메서드" + userDTO.toString());

        User user = User.builder()
                .email(userDTO.getEmail())
                .nickname(userDTO.getNickname())
                .password(bCryptPasswordEncoder.encode(userDTO.getPassword()))
                .roles("ROLE_USER").build();

        try{
            User savedUser = userService.save(user);

            UserDTO userResponseDTO = UserDTO.builder()
                    .userIndex(savedUser.getUserIndex())
                    .email(savedUser.getEmail())
                    .nickname(savedUser.getNickname())
                    .roles(savedUser.getRoles())
                    .build();
            return ResponseEntity.ok().body(userResponseDTO);
            }

        catch(Exception e) {

        ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }
}
