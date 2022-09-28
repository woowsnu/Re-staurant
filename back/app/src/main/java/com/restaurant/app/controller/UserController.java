package com.restaurant.app.controller;

import com.restaurant.app.DTO.FollowDTO;
import com.restaurant.app.DTO.ResponseDTO;
import com.restaurant.app.DTO.RestaurantLikeDTO;
import com.restaurant.app.DTO.UserDTO;
import com.restaurant.app.model.Follow;
import com.restaurant.app.model.RestaurantLike;
import com.restaurant.app.model.User;
import com.restaurant.app.service.FollowService;
import com.restaurant.app.service.RestaurantLikeService;
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
@RequestMapping("/api")
public class UserController {

    @Autowired
    private final RestaurantLikeService restaurantLikeService;
    @Autowired
    private final UserService userService;

    private final FollowService followService;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    // Create User : [회원가입 -> 로그인 필요없는 메서드]
    @PostMapping("/join")
    public ResponseEntity<?> join(@RequestBody UserDTO userDTO) {

        try{
            // userService 회원가입 메서드 호출 [userDTO, passwordEncoder 전달]
            userService.save(userDTO, bCryptPasswordEncoder);

            // 성공했을 경우 result:1로 설정하여 프론트로 전달.
            ResponseDTO responseDTO = ResponseDTO.builder().result(1).build();
            return ResponseEntity.ok().body(responseDTO);
        }
        catch (Exception e) {
            // 실패했을 경우 예외사항 메세지 전달
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

    // Read_User_Info : 유저 상세정보 [개인정보 + 팔로우/팔로워 + 리뷰게시글 등] +  상대방 유저정보 조회
    @PostMapping("/auth/userInfo")
    public ResponseEntity<?> readProfile(@RequestBody UserDTO userDTO) {

        try {
            // userDTO.getEmail()로 해당 유저가 DB에 존재하는지 검색하고 user객체 저장.
            User user = userService.findUserByEmail(userDTO.getEmail());

            // 해당 user의 followingList + followedList 조회하여 List<FollowDTO>형태로 저장.
            List<FollowDTO> followingDTOList = followService.findFollowByFollowingUser(user);
            List<FollowDTO> followedDTOList = followService.findFollowByFollowedUser(user);

            // 클라이언트 단으로 전달할 userDTO객체 생성하여 세팅한 뒤에 객체로 저장.
            UserDTO userResponseDTO = userService.readProfile(user,followingDTOList,followedDTOList);

            // 저장한 응답DTO객체 반환
            return ResponseEntity.ok().body(userResponseDTO);
        }
        catch (Exception e) {
            // 실패했을 경우 예외사항 메세지 전달
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();

            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

//     Update User_Info : 유저 닉네임 수정
    @PutMapping("/auth/updateNickname")
    public ResponseEntity<?> updateUserNickname(@AuthenticationPrincipal User authedUser,
                                                @RequestBody UserDTO updateUserDTO) {

        try {
            // 로그인된 사용자의 userIndex와 post로 전송된 userIndex가 동일할 경우에만 닉네임 변경 진행.
            userService.updateNickname(authedUser,updateUserDTO);

            // 성공했을 경우 result:1로 설정하여 프론트로 전달.
            ResponseDTO responseDTO = ResponseDTO.builder().result(1).build();
            return ResponseEntity.ok().body(responseDTO);
        }
        catch (Exception e) {
            // 실패했을 경우 예외사항 메세지 전달
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

    //     Update User_Info : 유저 패스워드 수정
    @PutMapping("/auth/updatePassword")
    public ResponseEntity<?> updateUserInfo(@AuthenticationPrincipal User authedUser,
                                            @RequestBody UserDTO updateUserDTO) {

        try {
            // 로그인된 사용자의 userIndex와 post로 전송된 userIndex가 동일할 경우에만 개인정보 변경 진행.
            userService.updatePassword(authedUser,updateUserDTO, bCryptPasswordEncoder);

            // 성공했을 경우 result:1로 설정하여 프론트로 전달.
            ResponseDTO responseDTO = ResponseDTO.builder().result(1).build();
            return ResponseEntity.ok().body(responseDTO);
        }
        catch (Exception e) {
            // 실패했을 경우 예외사항 메세지 전달
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

    //     Delete User_Info : 유저 삭제 [탈퇴기능]
    @DeleteMapping("/auth/deleteUserInfo")
    public ResponseEntity<?> deleteUserInfo(@AuthenticationPrincipal User authedUser,
                                            @RequestBody UserDTO deleteUserDTO) {

        try{
            // 로그인된 사용자의 userIndex와 post로 전송된 userIndex가 동일할 경우에만 개인정보 삭제 진행.
            userService.delete(authedUser,deleteUserDTO);

            // 성공했을 경우 result:1로 설정하여 프론트로 전달.
            ResponseDTO responseDTO = ResponseDTO.builder().result(1).build();
            return ResponseEntity.ok().body(responseDTO);
        }
        catch (Exception e) {
            // 실패했을 경우 예외사항 메세지 전달
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

    // 유저간 팔로우 수행
    @PostMapping("/auth/following")
    public ResponseEntity<?> following(@AuthenticationPrincipal User authedUser,
                                       @RequestBody FollowDTO followDTO) {

        try{
            // following 메서드 호출. 현재 로그인한 user와, followDTO에 있는 상대방 userEmail전달.
            followService.following(authedUser, followDTO);

            // 성공했을 경우 result:1로 설정하여 프론트로 전달.
            ResponseDTO responseDTO = ResponseDTO.builder().result(1).build();
            return ResponseEntity.ok().body(responseDTO);
        }
        catch (Exception e) {
            // 실패했을 경우 예외사항 메세지 전달
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

    @PutMapping("/auth/unFollowing")
    public ResponseEntity<?> unFollowing(@AuthenticationPrincipal User authedUser,
                                         @RequestBody FollowDTO unFollowDTO) {
        try{
            // following 메서드 호출. 현재 로그인한 user와, followDTO에 있는 상대방 userEmail전달.
            followService.unFollowing(authedUser, unFollowDTO);

            // 성공했을 경우 result:1로 설정하여 프론트로 전달.
            ResponseDTO responseDTO = ResponseDTO.builder().result(1).build();
            return ResponseEntity.ok().body(responseDTO);
        }
        catch (Exception e) {
            // 실패했을 경우 예외사항 메세지 전달
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

    //북마크 조회
    @GetMapping("/auth/findUserLike")
    public ResponseEntity<?> findUserView(@AuthenticationPrincipal User authedUser) {
        try{
            List<RestaurantLikeDTO> restaurantLikeDTOList = restaurantLikeService.findByUserIndex(authedUser);

            return ResponseEntity.ok().body(restaurantLikeDTOList);
        }
        catch(Exception e) {
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }
    }