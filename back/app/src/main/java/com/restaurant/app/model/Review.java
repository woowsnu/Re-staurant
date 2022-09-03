package com.restaurant.app.model;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewIndex;

    @Column(name="business_id")
    private String busId;

    @Column(name="review_title")
    private String reviewTitle;

    @Column(name="review_content")
    private String reviewContent;

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = User.class)
    @JoinColumn(name = "user_index")
    private User user;

    @CreatedDate
    private LocalDateTime createDate;

    @Override
    public String toString() {
        return "{ reviewIndex :" + reviewIndex + ", busId : " + busId + ", reviewTitle : " + reviewTitle  + ", reviewContent : "+ reviewContent +"}";
    }
}
