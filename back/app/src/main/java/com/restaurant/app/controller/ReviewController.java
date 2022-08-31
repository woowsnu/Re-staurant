package com.restaurant.app.controller;

import com.restaurant.app.DTO.ResponseDTO;
import com.restaurant.app.DTO.ReviewDTO;
import com.restaurant.app.config.auth.PrincipalDetails;
import com.restaurant.app.model.Review;
import com.restaurant.app.model.User;
import com.restaurant.app.repository.ReviewRepository;
import com.restaurant.app.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/review")
public class ReviewController {

    private final UserService userService;

    @Autowired
    private final ReviewRepository reviewRepository;

    // Create Review
    @PostMapping("/user/createReview")
    public ResponseEntity<?> createReview(@AuthenticationPrincipal PrincipalDetails principalDetails
                                          ,@RequestBody ReviewDTO reviewDTO) {

        User user = principalDetails.getUser();

        try {

            Review review = Review.builder()
                    .reviewTitle(reviewDTO.getReviewTitle())
                    .reviewContent(reviewDTO.getReviewContent())
                    .build();

            review.setUser(user);

            Review savedReview = reviewRepository.save(review);

            List<Review> reviewList = reviewRepository.findReviewByUser(user);

            List<ReviewDTO> reviews = reviewList.stream().map(ReviewDTO::new).collect(Collectors.toList());

            return ResponseEntity.ok().body(reviews);

        }
        catch (Exception e) {
            System.out.println(e.getMessage());
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

//    // Update Review
//    @PostMapping("/user/updateReview")
//    public ResponseEntity<?> updateReview(@RequestBody ReviewDTO reviewDTO) {
//        try {
//            reviewService.findByreviewIndex()
//            Review review = Review.builder()
//                    .reviewTitle(reviewDTO.getReviewTitle())
//                    .reviewContent(reviewDTO.getReviewContent())
//                    .build();
//
//            review.setUser(userEntity);
//
//            reviewRepository.save(review);
//
//            List<Review> reviewList = reviewRepository.findReviewByUser(userEntity);
//
//            List<ReviewDTO> reviews = reviewList.stream().map(ReviewDTO::new).collect(Collectors.toList());
//
//            return ResponseEntity.ok().body(reviews);
//
//        }
//        catch (Exception e) {
//            System.out.println(e.getMessage());
//            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
//            return ResponseEntity.badRequest().body(responseDTO);
//        }
//    }
}
