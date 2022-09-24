package com.restaurant.app.model;


import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@AllArgsConstructor
@Builder
public class ReviewPhoto implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "img_index")
    private Long imgIndex;

    @Column(name = "origin_image_name", nullable = false)
    private String originImageName;


    @Column(name = "image_name",nullable = false)
    private String imageName;

    @Column(name = "orig_fileName",nullable = false)
    private String imagePath;

//    private Long fileSize;

//    @ManyToOne(fetch = FetchType.LAZY, targetEntity = User.class)
//    @JoinColumn(name = "user_index")
//    private User user;

//    @ManyToOne(fetch = FetchType.LAZY, targetEntity = Review.class)
//    @JoinColumn(name = "review_index")
//    private Review review;

//    @Override
//    public String toString(){
//        return "{ reviewImages : " + imgIndex + ", imagesUrl" + imagesUrl +"}";
//    }


    public  ReviewPhoto(String originImageName, String imageName, String imagePath){
        this.originImageName=originImageName;
        this.imageName = imageName;
        this.imagePath = imagePath;
    }




}
