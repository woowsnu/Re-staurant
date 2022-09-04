package com.restaurant.app.controller;

import com.restaurant.app.DTO.ResponseDTO;
import com.restaurant.app.DTO.UserDTO;
import com.restaurant.app.model.User;
import com.restaurant.app.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    @Autowired
    private final UserService userService;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @GetMapping("/")
    public ResponseEntity test() {
        return ResponseEntity.ok().body("logout 되었습니다.");
    }

    // Create User : [회원가입 -> 로그인 필요없는 메서드]
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

    // Read_User_Info : 유저 상세정보 [개인정보 + 팔로우/팔로워 + 리뷰게시글 등]
    @GetMapping("/auth/userInfo")
    public ResponseEntity<?> ReadUserInfo(@AuthenticationPrincipal User authedUser) {
//        String email = userDTO.getEmail();

        System.out.println("userController.ReadUserInfo() -> 로그인 중인 사용자: " + authedUser.getEmail());

        try {

            UserDTO userResponseDTO = UserDTO.builder()
                    .userIndex(authedUser.getUserIndex())
                    .email(authedUser.getEmail())
                    .nickname(authedUser.getNickname())
                    .roles(authedUser.getRoles())
                    .reviewList(authedUser.reviewListToString())
                    .build();

            return ResponseEntity.ok().body(userResponseDTO);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();

            return ResponseEntity.badRequest().body(responseDTO);

        }
    }

//     Update User_Info : 유저 상세정보 수정 [개인정보 수정]
    @PutMapping("/auth/updateUserInfo")
    public ResponseEntity<?> updateUserInfo(@AuthenticationPrincipal User authedUser, @RequestBody UserDTO updateUserDTO) {

        System.out.println("userController.UpdateUserInfo() -> 로그인 중인 사용자: " + authedUser.getEmail());

        try {
            // 로그인된 사용자의 userIndex와 post로 전송된 userIndex가 동일할 경우에만 개인정보 변경 진행.
            User updatedUser = userService.update(authedUser,updateUserDTO, bCryptPasswordEncoder);

            UserDTO userResponseDTO = UserDTO.builder()
                    .userIndex(updatedUser.getUserIndex())
                    .email(updatedUser.getEmail())
                    .roles(updatedUser.getRoles())
                    .reviewList(updatedUser.reviewListToString())
                    .build();

            return ResponseEntity.ok().body(userResponseDTO);

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

            Long deletedUserIndex = userService.delete(authedUser,deleteUserDTO);

            return ResponseEntity.ok().body("reviewIndex : " + deletedUserIndex + "has deleted");
        }
        catch(Exception e) {
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

    }
}