package com.restaurant.app.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
public class Restaurant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="restaurant_index")
    private Long restaurantIndex;

    @Column(name="restaurant_name")
    private String restaurantName;


    @Column(name="restaurant_category")
    private String restaurantCategory; //레스토랑 카테고리

    @Column(name="x")
    private float x;

    @Column(name="y")
    private float y;

    @Column(name="full_address")
    private String fullAddress;

    @Column(name="full_road_address")
    private String fullRoadAddress;

    @Column(name="si_code")
    private String siCode;

    @Column(name="gun_code")
    private String gunCode;

    @Column(name="gu_code")
    private String guCode;

    @Column(name="tell_number")
    private String tellNumber;

    @Column(name="business_hour_info")
    private String businessHourInfo;

    @Column(name="sns_url")
    private String snsUrl;

    @Column(name="bus_id")
    private String busId;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "restaurant",cascade = CascadeType.ALL)
    private List<Options> optionsList  = new ArrayList<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "restaurant",cascade = CascadeType.ALL)
    private List<Menus> menuList = new ArrayList<>();

    //arrayToString?
    public String menuToString() {
        return menuList.toString();

    }

    public String optionsList(){
        return optionsList.toString();
    }

}
