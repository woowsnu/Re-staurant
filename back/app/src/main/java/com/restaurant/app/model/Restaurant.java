package com.restaurant.app.model;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Builder
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Restaurant implements Serializable {
//public class Restaurant{

        @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="restaurant_index")
    private Long restaurantIndex; //레스토랑 프로필 id

    @Column(name="bus_id",unique = true,nullable = false, updatable = false)
    private Long busId;

    @Column(name="restaurant_name")
    private String restaurantName;


    @Column(name="restaurant_category")
    private String restaurantCategory; //레스토랑 카테고리

    @Column(name="x")
    private Float x;

    @Column(name="y")
    private Float y;

    @Column(name="full_address")
    private String fullAddress;

    @Column(name="full_road_address")
    private String fullRoadAddress;

    @Column(name="si_code")
    private String siCode;

    @Column(name="gu_code")
    private String guCode;

    @Column(name="dong_code")
    private String dongCode;

    @Column(name="tell_number")
    private String tellNumber;

    @Column(name="description",columnDefinition = "TEXT")
    private String description;

    @Column(name="business_hour_info",columnDefinition = "TEXT")
    private String businessHourInfo;

    @Column(name="sns_url")
    private String snsUrl;



    @OneToMany(fetch = FetchType.EAGER, mappedBy = "restaurant",cascade = CascadeType.ALL)
    private Set<Options> optionsList    = new HashSet<>();


    @OneToMany(fetch = FetchType.EAGER, mappedBy = "restaurant",cascade = CascadeType.ALL)
    private Set<Menus> menuList = new HashSet<>();

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "restaurant", cascade = CascadeType.ALL)
    private Set<Review> reviewList = new HashSet();

    //arrayToString?
    public String menuToString() {
        return "{"+menuList.toString()+"}";

    }


    public String optionsList(){

        return "{" + optionsList.toString() + "}";
//        return "{Restaurant" + optionsList+ "}";
    }

    public String reviewList(){

        return "{" + reviewList.toString() + "}";

    }

}
