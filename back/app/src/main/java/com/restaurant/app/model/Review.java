package com.restaurant.app.model;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Review implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_index")
    private Long reviewIndex;


    @Column(name="review_title")
    private String reviewTitle;

    @Column(name="review_content")
    private String reviewContent;

    @Column(name="review_image")
    private String review_image;

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = User.class)
    @JoinColumn(name = "user_index",referencedColumnName = "user_index")
    private User user;


    @ManyToOne(fetch = FetchType.LAZY, targetEntity = Restaurant.class)
    @JoinColumn(name = "restaurant_index",referencedColumnName = "restaurant_index")
    private Restaurant restaurant;

    @CreatedDate
    private LocalDateTime createDate;


    @Override
    public String toString() {
        return "{ reviewIndex :" + reviewIndex + ", reviewTitle : " + reviewTitle  + ", reviewContent : "+ reviewContent +
                ", email : " + user.getEmail() + ", nickname : " +user.getNickname() +"}" ;

    }



}
