package com.restaurant.app.DTO;

import com.restaurant.app.model.Review;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDTO {
    private Long reviewIndex;
    private String email;
    private String reviewTitle;
    private String reviewContent;

    private String reviewImage;
    private String nickName;
    private String busId;


    private int tag;

    private int revisit;

    private LocalDateTime createDate;

    private String restaurantName;



    public ReviewDTO(Review review) {
        this.reviewIndex = review.getReviewIndex();
        this.reviewImage = review.getReviewImage();
        this.revisit = review.getRevisit();
        this.tag = review.getTag();
        this.email = review.getUser().getEmail();
        this.reviewTitle = review.getReviewTitle();
        this.reviewContent = review.getReviewContent();
        this.nickName = review.getUser().getNickname();
        this.reviewImage = review.getReviewImage();
        this.revisit = review.getRevisit();
        this.tag = review.getTag();

        this.busId = review.getRestaurant().getBusId();

        this.createDate = review.getCreateDate();

        this.restaurantName = review.getRestaurant().getRestaurantName();




    }



}