package com.restaurant.app.DTO;

import com.restaurant.app.model.Review;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDTO {
    private Long reviewIndex;
    private String email;
    private String reviewTitle;
    private String reviewContent;

    public ReviewDTO(Review review) {
        this.reviewIndex = review.getReviewIndex();
        this.email = review.getUser().getEmail();
        this.reviewTitle = review.getReviewTitle();
        this.reviewContent = review.getReviewContent();
    }

}
