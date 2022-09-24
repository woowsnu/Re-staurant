package com.restaurant.app.DTO;


import com.restaurant.app.model.Review;
import com.restaurant.app.model.ReviewPhoto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data

@NoArgsConstructor
//@AllArgsConstructor
public class ReviewPhotoDTO {

    private Long imgIndex;
private String originImageName;
    private String imageName;
    private String imagePath;
//
//    private Long fileSize;

//    private Review review;

    @Builder

    public ReviewPhoto toEntity(){
        ReviewPhoto build = ReviewPhoto.builder()
                .imgIndex(imgIndex)
                .originImageName(originImageName)
                .imageName(imageName)
                .imagePath(imagePath)
                .build();
        return build;
    }

    public ReviewPhotoDTO(Long imgIndex,String originImageName, String imageName, String imagePath){
        this.imgIndex = imgIndex;
        this.originImageName = originImageName;
        this.imageName = imageName;
        this.imagePath = imagePath;
    }


}
