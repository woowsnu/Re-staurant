package com.restaurant.app.controller;

import com.restaurant.app.DTO.ResponseDTO;
import com.restaurant.app.DTO.ReviewDTO;
import com.restaurant.app.model.Review;
import com.restaurant.app.model.User;
import com.restaurant.app.service.ReviewService;
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
    private final ReviewService reviewService;

    // Create Review
    @PostMapping("/{busId}/auth/createReview")
    public ResponseEntity<?> createReview(@AuthenticationPrincipal User authedUser
                                          , @PathVariable String busId, @RequestBody ReviewDTO reviewDTO) {

        try {

            List<Review> reviewList = reviewService.save(authedUser,reviewDTO,busId);
            List<ReviewDTO> reviewsDTO = reviewList.stream().map(ReviewDTO::new).collect(Collectors.toList());

            System.out.println("reviewList : " + reviewList);

            return ResponseEntity.ok().body(reviewsDTO);

        }
        catch (Exception e) {
            System.out.println(e.getMessage());
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }


    // Update Review
    @PutMapping("{reviewIndex}/auth/updateReview")
    public ResponseEntity<?> updateReview(@AuthenticationPrincipal User authedUser,
                                          @RequestBody ReviewDTO updateReviewDTO,
                                          @PathVariable Long reviewIndex) {
        try{

        Review updatedReview = reviewService.update(authedUser, updateReviewDTO,reviewIndex);

        ReviewDTO responseReviewDTO = ReviewDTO.builder()
                .reviewIndex(updatedReview.getReviewIndex())
                .reviewTitle(updatedReview.getReviewTitle())
                .reviewContent(updatedReview.getReviewContent())
                .email(updatedReview.getUser().getEmail())
                .busId(updatedReview.getBusId())
                .build();

            return ResponseEntity.ok().body(responseReviewDTO);
        }
        catch (Exception e) {
            System.out.println(e.getMessage());
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

    // Delete Review
    @DeleteMapping("{reviewIndex}/auth/deleteReview")
    public ResponseEntity<?> deleteReview(@AuthenticationPrincipal User authedUser,
                                          @PathVariable Long reviewIndex) {

        try{
            Long deletedReviewIndex = reviewService.delete(authedUser,reviewIndex);

            return ResponseEntity.ok().body("reviewIndex : " + deletedReviewIndex + "has deleted");
        }
        catch(Exception e) {
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity.ok().body(responseDTO);
        }
    }
}
