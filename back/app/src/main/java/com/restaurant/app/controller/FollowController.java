package com.restaurant.app.controller;

import com.restaurant.app.DTO.FollowDTO;
import com.restaurant.app.DTO.ResponseDTO;
import com.restaurant.app.model.Follow;
import com.restaurant.app.model.User;
import com.restaurant.app.service.FollowService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

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
            followService.unFollowing(authedUser, unFollowDTO);

            ResponseDTO responseDTO = ResponseDTO.builder().result(1).build();
//            ResponseDTO responseDTO = ResponseDTO.builder().result(0).build();

            return ResponseEntity.ok().body(responseDTO);
        }
        catch(Exception e) {
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

    @GetMapping("/auth/followingList")
    public ResponseEntity<?> getFollowingList(@AuthenticationPrincipal User authedUser) {

        List<Follow> followingList = followService.findFollowByFollowingUser(authedUser);
        List<FollowDTO> followingDTOList = followingList.stream().map(FollowDTO::new).collect((Collectors.toList()));

        return ResponseEntity.ok().body(followingDTOList);
    }

    @GetMapping("/auth/followedList")
    public ResponseEntity<?> getFollowedList(@AuthenticationPrincipal User authedUser) {
        List<Follow> followedList = followService.findFollowByFollowedUser(authedUser);
        List<FollowDTO> followedDTOList = followedList.stream().map(FollowDTO::new).collect((Collectors.toList()));

        return ResponseEntity.ok().body(followedDTOList);
    }
}