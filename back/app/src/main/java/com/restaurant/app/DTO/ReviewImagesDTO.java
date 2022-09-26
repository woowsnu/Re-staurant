package com.restaurant.app.DTO;


import com.restaurant.app.model.Review;
import com.restaurant.app.model.ReviewImages;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewImagesDTO  {

    private Long reviewImages;
    private String imagesUrl;

    private String origFileName;

    private Long fileSize;

    private Review review;

    public ReviewImagesDTO(ReviewImages reviewImages){
        this.reviewImages = reviewImages.getReviewImages();
        this.imagesUrl = reviewImages.getImagesUrl();
        this.origFileName = reviewImages.getOrigFileName();
        this.fileSize = reviewImages.getFileSize();
    }


}
