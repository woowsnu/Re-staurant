package com.restaurant.app.controller;

import com.restaurant.app.DTO.ResponseDTO;
import com.restaurant.app.DTO.ReviewDTO;
import com.restaurant.app.DTO.UserDTO;
import com.restaurant.app.model.Review;
import com.restaurant.app.model.User;
import com.restaurant.app.repository.ReviewRepository;
import com.restaurant.app.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {


    @Autowired
    private final UserService userService;

    @Autowired
    private final ReviewRepository reviewRepository;

    @PostMapping("/info")
    public ResponseEntity<?> findByUsername(@RequestBody UserDTO userDTO) {
        System.out.println("userController.findByUsername : " + userDTO.toString());

        try {

            User user = userService.findByUsername(userDTO.getUsername());

            UserDTO userEntity = UserDTO.builder()
                                        .userIndex(user.getUserIndex())
                                        .email(user.getEmail())
                                        .roles(user.getRoles())
                                        .username(user.getUsername())
                                        .reviewList(user.reviewListToString())
                                        .build();


            return ResponseEntity.ok().body(userEntity);
        }
        catch (Exception e) {
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();

            return ResponseEntity.badRequest().body(responseDTO);

        }
    }

    @PostMapping("/createPost")
    public ResponseEntity<?> createPost(@RequestBody ReviewDTO reviewDTO) {
        try {
            User userEntity = userService.findUserByEmail(reviewDTO.getEmail());

            Review review = Review.builder()
                    .reviewTitle(reviewDTO.getReviewTitle())
                    .reviewContent(reviewDTO.getReviewContent())
                    .build();
            review.setUser(userEntity);

            reviewRepository.save(review);

            List<Review> reviewList = reviewRepository.findReviewByUser(userEntity);

            List<ReviewDTO> reviews = reviewList.stream().map(ReviewDTO::new).collect(Collectors.toList());

            return ResponseEntity.ok(reviews);

        }
        catch (Exception e) {
            System.out.println(e.getMessage());
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }


    }
}
