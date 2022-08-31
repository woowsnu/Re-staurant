package com.restaurant.app.controller;

import com.restaurant.app.DTO.ResponseDTO;
import com.restaurant.app.DTO.UserDTO;
import com.restaurant.app.model.User;
import com.restaurant.app.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/")
public class TestController {

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private final UserService userService;

    @PostMapping("/join")
    public ResponseEntity<?> join(@RequestBody UserDTO userDTO) {
        System.out.println("POST요청[/join]: 회원가입 메서드" + userDTO.toString());

        User user = User.builder()
                .email(userDTO.getEmail())
                .username(userDTO.getUsername())
                .password(bCryptPasswordEncoder.encode(userDTO.getPassword()))
                .roles("ROLE_USER").build();

        try{
            if(userService.findUserByEmail(userDTO.getEmail()) != null) {
                System.out.println("존재하는 이메일 입니다.");
                ResponseDTO responseDTO = ResponseDTO.builder().error("존재하는 이메일 입니다.").build();
                return ResponseEntity.badRequest().body(responseDTO);
            }
        }
        catch(Exception e) {

            return ResponseEntity.ok().body(userService.save(user));
        }
        return null;
    }
}
