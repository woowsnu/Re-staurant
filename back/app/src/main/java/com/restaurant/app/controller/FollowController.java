package com.restaurant.app.controller;

import com.restaurant.app.DTO.FollowDTO;
import com.restaurant.app.DTO.ResponseDTO;
import com.restaurant.app.model.User;
import com.restaurant.app.service.FollowService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/follow")
public class FollowController {

    @Autowired
    private final FollowService followService;
    @PostMapping("/auth/following")
    public ResponseEntity<?> following(@AuthenticationPrincipal User authedUser,
                                       @RequestBody FollowDTO followDTO) {

        try{
            User follower = followService.following(authedUser, followDTO);

            FollowDTO followResponseDTO = FollowDTO.builder()
//                    .followingList(follower.getFollowingList())
                    .build();

            return ResponseEntity.ok().body(followResponseDTO);
        }
        catch(Exception e) {
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();

            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

    @DeleteMapping("/auth/unFollowing")
    public ResponseEntity<?> unFollowing(@AuthenticationPrincipal User authedUser,
             @RequestBody FollowDTO unFollowDTO) {
        try{
            User unFollower = followService.unFollowing(authedUser, unFollowDTO);

            FollowDTO unFollowResponseDTO = FollowDTO.builder()
//                    .followingList(follower.getFollowingList())
                    .build();

            return ResponseEntity.ok().body(unFollowResponseDTO);
        }
        catch(Exception e) {
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();

            return ResponseEntity.badRequest().body(responseDTO);
        }
    }
}
