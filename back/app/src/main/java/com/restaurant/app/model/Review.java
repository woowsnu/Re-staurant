package com.restaurant.app.model;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Review implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_index")
    private Long reviewIndex;

    @Column(name="review_title")
    private String reviewTitle;
    @Column(name="review_content")
    private String reviewContent;

    @Column(name="review_image",columnDefinition = "TEXT")
    private String reviewImage;

    @Column(name="review_tag")
    private int tag;

    @Column(name="revisit")
    private int revisit;

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = User.class)
    @JoinColumn(name = "user_index",referencedColumnName = "user_index")
    private User user;
    @ManyToOne(fetch = FetchType.LAZY, targetEntity = Restaurant.class)
    @JoinColumn(name = "restaurant_index",referencedColumnName = "restaurant_index")
    private Restaurant restaurant;


    @CreatedDate
    private LocalDateTime createDate;

    @LastModifiedDate
    private LocalDateTime modifiedDate;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "review", cascade = {CascadeType.PERSIST,CascadeType.REMOVE}, orphanRemoval = true)
//    private Set<ReviewImages> reviewImagesList = new HashSet();

//    private List<ReviewPhoto> reviewImagesList = new ArrayList<>();
//    public List<ReviewImagesDTO> reviewImagesList(Set<ReviewImages> reviewImagesList){
//
//        List<ReviewImagesDTO> reviewImagesDTOList = reviewImagesList.stream().map(ReviewImagesDTO::new).collect((Collectors.toList()));
//
//        return  reviewImagesDTOList;
//    }




    @Override
    public String toString() {
        return "{ reviewIndex :" + reviewIndex + ", reviewTitle : " + reviewTitle  + ", reviewContent : "+ reviewContent +
                ", email : " + user.getEmail() + ", nickname : " +user.getNickname() +  "}" ;

    }


}
