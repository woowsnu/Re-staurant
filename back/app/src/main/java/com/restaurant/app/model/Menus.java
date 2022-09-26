package com.restaurant.app.model;


import lombok.*;

import javax.persistence.*;

@Builder
@Getter
@Setter
@ToString
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

    @ManyToOne(fetch = FetchType.EAGER, targetEntity = Restaurant.class)
    @JoinColumn(name = "restaurant_index",referencedColumnName = "restaurant_index")
    private Restaurant restaurant;



}
