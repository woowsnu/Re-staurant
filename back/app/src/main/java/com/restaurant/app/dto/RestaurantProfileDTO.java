package com.restaurant.app.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.restaurant.app.model.RestaurantProfile;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantProfileDTO {

    private Long restaurantProfileIndex;
    private Float restaurantProfileXFloat;
    private Float restaurantProfileYFloat;
    private String fullAddress;
    private String fullRoadAddress;
    private String tellNumber;
    private String businessHourInfo;
    private String snsUrl;

    private String menuList;

    //관리자 또는 가게 운영자가 자신의 가게 프로필을 프론트엔드에서 등록하려는 경우 필요

    public RestaurantProfileDTO(RestaurantProfile restaurantProfile){
        this.restaurantProfileIndex = getRestaurantProfileIndex();
        this.restaurantProfileXFloat = getRestaurantProfileXFloat();
        this.restaurantProfileYFloat = getRestaurantProfileYFloat();
        this.fullAddress = getFullAddress();
        this.fullRoadAddress = getFullRoadAddress();
        this.tellNumber = getTellNumber();
        this.businessHourInfo = getBusinessHourInfo();
        this.snsUrl = getSnsUrl();
        this.menuList = getMenuList();
    }

}
