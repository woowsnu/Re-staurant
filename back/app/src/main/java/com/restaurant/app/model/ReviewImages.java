package com.restaurant.app.model;


import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewImages implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_images")
    private Long reviewImages;

    @Column(name = "images_url", nullable = false)
    private String imagesUrl;

    @Column(name = "orig_FileName",nullable = false)
    private String origFileName;

    private Long fileSize;

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = User.class)
    @JoinColumn(name = "user_index",referencedColumnName = "user_index")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = Review.class)
    @JoinColumn(name = "review_index")
    private Review review;

    @Override
    public String toString(){
        return "{ reviewImages : " + reviewImages + ", imagesUrl" + imagesUrl +"}";
    }



}
