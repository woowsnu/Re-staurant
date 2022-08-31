package com.restaurant.app.dto;

import com.restaurant.app.model.RestaurantProfile;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantProfileDTO {

    private Long restaurantProfileIndex;
    private String restaurantProfileName;
    private Float restaurantProfileXFloat;
    private Float restaurantProfileYFloat;
    private String fullAddress;
    private String fullRoadAddress;
    private String tellNumber;
    private String businessHourInfo;
    private String snsUrl;

    private String options;

    public RestaurantProfileDTO(RestaurantProfile restaurantProfile){
        this.restaurantProfileIndex = getRestaurantProfileIndex();
        this.restaurantProfileName = getRestaurantProfileName();
        this.restaurantProfileXFloat = getRestaurantProfileXFloat();
        this.restaurantProfileYFloat = getRestaurantProfileYFloat();
        this.fullAddress = getFullAddress();
        this.fullRoadAddress = getFullRoadAddress();
        this.tellNumber = getTellNumber();
        this.businessHourInfo = getBusinessHourInfo();
        this.snsUrl = getSnsUrl();
        this.options = getOptions();


    }


}
