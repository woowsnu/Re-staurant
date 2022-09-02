package com.restaurant.app.controller;

import com.restaurant.app.DTO.FollowDTO;
import com.restaurant.app.DTO.ResponseDTO;
import com.restaurant.app.model.User;
import com.restaurant.app.service.FollowService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/follow")
public class FollowController {

    @Autowired
    private final FollowService followService;
    @PostMapping("/auth/following")
    public ResponseEntity<?> following(@AuthenticationPrincipal User authedUser, @RequestBody FollowDTO followDTO) {

        try{
            User follower = followService.following(authedUser, followDTO);

            FollowDTO followResponseDTO = FollowDTO.builder()
                    .followingList(follower.getFollowingList())
                    .build();

            return ResponseEntity.ok().body(followResponseDTO);
        }
        catch(Exception e) {
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();

            return ResponseEntity.badRequest().body(responseDTO);
        }
    }
}
