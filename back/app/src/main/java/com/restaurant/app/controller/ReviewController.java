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
@RequestMapping("/review")
public class ReviewController {

    private final ReviewService reviewService;

    // Create Review
    @PostMapping("/{busId}/auth/createReview")
    public ResponseEntity<?> createReview(@AuthenticationPrincipal User authedUser
            , @PathVariable String busId, @RequestBody ReviewDTO reviewDTO) {

        try {

            reviewService.save(authedUser,reviewDTO,busId);

            ResponseDTO responseDTO = ResponseDTO.builder().result(1).build();
            return ResponseEntity.ok().body(responseDTO);

        }
        catch (Exception e) {
            System.out.println(e.getMessage());
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

    //read
    @GetMapping("/{email}/auth/findUserView")
    public ResponseEntity<?> findUserView(@AuthenticationPrincipal User authedUser,@PathVariable String email){
        try{
            List<Review> reviewList = reviewService.findByEmail(authedUser,email);

            List<ReviewDTO> reviewDTOs = reviewList.stream().map(ReviewDTO::new).collect((Collectors.toList()));


            return ResponseEntity.ok().body(reviewDTOs);
        }
        catch(Exception e) {
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

    @GetMapping("/reviewSearch")
    public ResponseEntity<?> reviewSearch (@RequestBody ReviewDTO reviewDTO){
        try{
            List<Review> reviewList = reviewService.findReview(reviewDTO);
            List<ReviewDTO> reviewDTOs = reviewList.stream().map(ReviewDTO::new).collect((Collectors.toList()));
            return  ResponseEntity.ok().body(reviewDTOs);
        }
        catch(Exception e) {
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }


    // Update Review
    @PutMapping("{busId}/auth/updateReview")
    public ResponseEntity<?> updateReview(@AuthenticationPrincipal User authedUser,
                                          @RequestBody ReviewDTO updateReviewDTO,
                                          @PathVariable String busId ) {
        try{

            reviewService.update(authedUser, updateReviewDTO,busId);

            ResponseDTO responseDTO = ResponseDTO.builder().result(1).build();
            return ResponseEntity.ok().body(responseDTO);
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