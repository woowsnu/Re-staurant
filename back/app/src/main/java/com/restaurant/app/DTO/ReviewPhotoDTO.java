package com.restaurant.app.DTO;


import com.restaurant.app.model.Review;
import com.restaurant.app.model.ReviewPhoto;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
//@AllArgsConstructor
public class ReviewPhotoDTO {

    private Long imgIndex;
    private String originImageName;
    private String imageName;
    private String imageUlr;
//
//    private Long fileSize;

//    private Review review;


//
    public ReviewPhoto toEntity(){
        ReviewPhoto build = ReviewPhoto.builder()
                .imgIndex(imgIndex)
                .originImageName(originImageName)
                .imageName(imageName)
                .imageUlr(imageUlr)
                .build();
        return build;
    }

//    public ReviewPhotoDTO(Long imgIndex,String originImageName, String imageName, String imageUlr){
//        this.imgIndex = imgIndex;
//        this.originImageName = originImageName;
//        this.imageName = imageName;
//        this.imageUlr = imageUlr;
//    }


    public ReviewPhotoDTO(ReviewPhoto reviewPhoto) {
        this.imgIndex = imgIndex;
        this.originImageName = originImageName;
        this.imageName = imageName;
        this.imageUlr = imageUlr;
    }
}
