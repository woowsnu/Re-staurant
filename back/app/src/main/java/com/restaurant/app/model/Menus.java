package com.restaurant.app.model;


import lombok.*;

import javax.persistence.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Menus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="menu_index")
    private Long menuIndex;

    @Column(name="menu_name")
    private String menuName;

    @Column(name="menu_price")
    private String menuPrice;

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = Restaurant.class)
    @JoinColumn(name = "bus_id")
    private Restaurant restaurant;


    //순환참조 해결용 toString Override
    @Override
    public String toString() {
        return "menuName : " + menuName  + ", menuPrice : "+ menuPrice;
    }

}
