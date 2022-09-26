package com.restaurant.app.model;


import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@AllArgsConstructor
@Builder
public class ReviewPhoto  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "img_index")
    private Long imgIndex;

//    @Column(name = "origin_image_name", nullable = false)
    @Column(name = "origin_image_name")
    private String originImageName;


//    @Column(name = "image_name",nullable = false)
    @Column(name = "image_name")
    private String imageName;

//    @Column(name = "orig_fileName",nullable = false)
    @Column(name = "orig_fileName")
    private String imageUlr;

//    private Long fileSize;

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = User.class)
    @JoinColumn(name = "user_index")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = Review.class)
    @JoinColumn(name = "review_index")
    private Review review;

    @Override
    public String toString(){
        return "{ reviewImages : " + imgIndex + ", originImageName : " + originImageName + ", imageName : " +imageName +  ", imagesUrl" + imageUlr +"}";
    }



//    @Builder
//    public  ReviewPhoto(Long imgIndex,String originImageName, String imageName, String imagePath){
//        this.imgIndex =imgIndex;
//        this.originImageName=originImageName;
//        this.imageName = imageName;
//        this.imagePath = imagePath;
////        this.fileSize = fileSize;
//    }

//    public void setReview(Review review){
//        this.review =review;
//
////        if(!review.getRev)
//    }




}
