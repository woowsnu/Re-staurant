package com.restaurant.app.DTO;

import com.restaurant.app.model.Review;
//import com.restaurant.app.model.ReviewPhoto;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
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

    private LocalDateTime modifiedDate;

//    private Long fileId;


//    private List<ReviewPhoto> reviewImagesList;

//    public Review toEntity(){
//        Review review = Review.builder()
//                .reviewIndex(reviewIndex)
//                .reviewImage(reviewImage)
//                .revisit(revisit)
//                .tag(tag)
//                .reviewTitle(reviewTitle)
//                .reviewContent(reviewContent)
//                .createDate(createDate)
//                .modifiedDate(modifiedDate)
//                .fileId(fileId)
//                .build();
//        return review;
//    }
//


    public ReviewDTO(Review review) {
        this.reviewIndex = review.getReviewIndex();
        this.reviewImage = review.getReviewImage();
        this.email = review.getUser().getEmail();
        this.reviewTitle = review.getReviewTitle();
        this.reviewContent = review.getReviewContent();
        this.nickName = review.getUser().getNickname();
        this.revisit = review.getRevisit();
        this.tag = review.getTag();


        this.busId = review.getRestaurant().getBusId();

        this.createDate = review.getCreateDate();
        this.modifiedDate = review.getModifiedDate();

        this.restaurantName = review.getRestaurant().getRestaurantName();
//        this.fileId = review.getFileId();

//        this.reviewImagesList = review.getReviewImagesList();


    }



}