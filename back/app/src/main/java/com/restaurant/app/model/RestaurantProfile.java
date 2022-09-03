package com.restaurant.app.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;
import org.hibernate.annotations.Columns;

import javax.persistence.*;
import java.awt.*;
import java.util.*;
import java.util.List;

@Entity
@Builder
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="restaurant_profile_index")
    private Long restaurantProfileIndex; //레스토랑 프로필 id


    @Column(name="xFLOAT")
    private float xFloat;

    @Column(name="yFLOAT")
    private float yFloat;

    @Column(name="full_address")
    private String fullAddress;

    @Column(name="full_road_address")
    private String fullRoadAddress;

    @Column(name="tell_number")
    private String tellNumber;

    @Column(name="business_hour_info")
    private String businessHourInfo;

    @Column(name="sns_url")
    private String snsUrl;

    @OneToOne
    @JoinColumn(name = "restaurant_index")
    private Restaurant restaurant;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "restaurantProfile")
    private List<Menus> menuList = new ArrayList<>();

//arrayToString?
@Override
public String toString() {
    return "{"+menuList.toString()+"}";

}

}
