package com.restaurant.app.model;


import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Builder
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Options implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="option_index")
    private Long optionIndex;

    @Column(name="option_id")
    private Long optionId;

    @Column(name="option_name")
    private String optionName;

    @Column(name="is_check")
    private int isCheck;

    @Column(name="order_Count")
    private int orderCount;

    @Column(name="icon_url")
    private String iconUrl;

    @ManyToOne(fetch =FetchType.LAZY, targetEntity = Restaurant.class)
    @JoinColumn(name = "restaurant_index",referencedColumnName = "restaurant_index")
    private Restaurant restaurant;

}
