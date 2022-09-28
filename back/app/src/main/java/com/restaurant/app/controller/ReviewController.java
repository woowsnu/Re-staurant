package com.restaurant.app.controller;

import com.restaurant.app.DTO.ResponseDTO;
import com.restaurant.app.DTO.RestaurantDTO;
import com.restaurant.app.DTO.ReviewDTO;
import com.restaurant.app.model.Review;
import com.restaurant.app.model.User;
import com.restaurant.app.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ReviewController {

    private final ReviewService reviewService;

    // Create Review
    @PostMapping("/auth/createReview")
    public ResponseEntity<?> createReview(@AuthenticationPrincipal User authedUser
            , @RequestParam(value="busId") String busId, @RequestBody ReviewDTO reviewDTO) {

        try {

            reviewService.save(authedUser,reviewDTO,busId);

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

    // Update Review
    @PutMapping("/auth/updateReview")
    public ResponseEntity<?> updateReview(@AuthenticationPrincipal User authedUser,
                                          @RequestBody ReviewDTO updateReviewDTO,
                                          @RequestParam(value="reviewIndex") String reviewIndex) {

        try{

            reviewService.update(authedUser, updateReviewDTO,Long.parseLong(reviewIndex));

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


    // Delete Review
    @DeleteMapping("/auth/deleteReview")
    public ResponseEntity<?> deleteReview(@AuthenticationPrincipal User authedUser,
                                          @RequestParam String reviewIndex) {

        try{
            Long deletedReviewIndex = reviewService.delete(authedUser,Long.parseLong(reviewIndex));

            return ResponseEntity.ok().body("reviewIndex : " + deletedReviewIndex + "has deleted");
        }
        catch(Exception e) {
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity.ok().body(responseDTO);
        }
    }
}