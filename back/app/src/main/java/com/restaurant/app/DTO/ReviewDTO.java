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
<<<<<<< HEAD

=======
>>>>>>> 146e57d95fa830a914af3e03f3867ce8f8aeb424
    private String reviewImage;
    private String nickName;
    private String busId;
<<<<<<< HEAD

    private int tag;

    private int revisit;






=======
    private int tag;
    private int revisit;
>>>>>>> 146e57d95fa830a914af3e03f3867ce8f8aeb424

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



    }



}