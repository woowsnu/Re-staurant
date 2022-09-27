//package com.restaurant.app.controller;
//
//import com.restaurant.app.DTO.FollowDTO;
//import com.restaurant.app.DTO.ResponseDTO;
//import com.restaurant.app.model.Follow;
//import com.restaurant.app.model.User;
//import com.restaurant.app.service.FollowService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.annotation.AuthenticationPrincipal;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//import java.util.stream.Collectors;
//
//@RestController
//@RequiredArgsConstructor
//@RequestMapping("/follow")
//public class FollowController {
//
//
//
////    @GetMapping("/auth/followingList")
////    public ResponseEntity<?> getFollowingList(@AuthenticationPrincipal User authedUser) {
////        List<FollowDTO> followingDTOList = followService.findFollowByFollowingUser(authedUser);
////
////        return ResponseEntity.ok().body(followingDTOList);
////    }
////
////    @GetMapping("/auth/followedList")
////    public ResponseEntity<?> getFollowedList(@AuthenticationPrincipal User authedUser) {
////        List<FollowDTO> followedDTOList = followService.findFollowByFollowedUser(authedUser);
////
////        return ResponseEntity.ok().body(followedDTOList);
////    }
//}