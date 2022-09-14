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
    @Column(name="restaurant_option_index")
    private Long restaurantOptionIndex;

    @Column(name="icon_url")
    private String iconUrl;

    @Column(name="is_check")
    private int isCheck;

    @Column(name="option_num")
    private int optionNum;

    @Column(name="option_order")
    private int optionOrder;


    @ManyToOne(fetch =FetchType.LAZY, targetEntity = Restaurant.class)
    @JoinColumn(name= "bus_id" ,referencedColumnName = "bus_id")
    private Restaurant restaurant;

    @Override
    public String toString() {
        return "iconUrl : " + iconUrl  + ", isCheck : "+ isCheck + ", optionNum : " + optionNum +
                ", optionOrder : "+optionOrder ;

    }



}
