package com.restaurant.app.controller;

import com.restaurant.app.DTO.ResponseDTO;
import com.restaurant.app.DTO.ReviewDTO;
import com.restaurant.app.model.Review;
import com.restaurant.app.model.User;
import com.restaurant.app.repository.ReviewRepository;
import com.restaurant.app.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

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
    @PostMapping("/{busId}/auth/createReview")
    public ResponseEntity<?> createReview(@AuthenticationPrincipal User authedUser
                                          , @PathVariable String busId, @RequestBody ReviewDTO reviewDTO) {

        try {

            Review review = Review.builder()
                    .busId(busId)
                    .reviewTitle(reviewDTO.getReviewTitle())
                    .reviewContent(reviewDTO.getReviewContent())
                    .build();

            review.setUser(authedUser);

            Review savedReview = reviewRepository.save(review);
            System.out.println("savedReview" + savedReview);

            List<Review> reviewList = reviewRepository.findReviewByUser(authedUser);
            System.out.println("reviewList : " + reviewList);

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
//    @PostMapping("/{bus_id}/{review_index}/auth/updateReview")
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
