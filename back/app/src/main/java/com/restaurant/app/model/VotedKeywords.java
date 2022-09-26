package com.restaurant.app.model;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Builder
@Getter @Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class VotedKeywords {

    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    @Column(name="keywords_index")
    private Long keywordsIndex;

    @Column(name="keywords_code")
    private String keywordsCode;

    @Column(name="keywords_name")
    private String keywordsName;

    @Column(name="keywords_count")
    private Long keywordsCount;

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = Restaurant.class)
    @JoinColumn(name="restaurant_index",referencedColumnName = "restaurant_index")
    private Restaurant restaurant;

    @Override
    public String toString() {
        return "KeywordsCode : " + keywordsCode + "keywordsName : "
                + keywordsName +"keywordsCount : " + keywordsCount;
    }

}
