package com.restaurant.app.DTO;

import com.restaurant.app.model.Restaurant;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantDTO {

    private Long restaurantIndex;  //레스토랑 아이디
    private String busId;
    private String restaurantCategory;   //레스토랑 카테고리
    private String restaurantName;
    private Float x;
    private Float y;
    private String description;
    private String fullAddress;
    private String fullRoadAddress;
    private String siCode;
    private String guCode;

    private String gunCode;
    private String dongCode;
    private String tellNumber;
    private String businessHourInfo;
    private String snsUrl;
    private String menuList;

    private String optionsList;

    public RestaurantDTO(Restaurant restaurant) {
        this.restaurantIndex = restaurant.getRestaurantIndex();
        this.busId = restaurant.getBusId();
        this.restaurantCategory = restaurant.getRestaurantCategory();
        this.restaurantName = restaurant.getRestaurantName();
        this.description = restaurant.getDescription();;
        this.restaurantName = restaurant.getRestaurantName();
        this.x = restaurant.getX();
        this.y = restaurant.getY();
        this.fullAddress = restaurant.getFullAddress();
        this.fullRoadAddress = restaurant.getFullRoadAddress();
        this.siCode = restaurant.getSiCode();
        this.guCode = restaurant.getGuCode();
        this.gunCode = restaurant.getGunCode();
        this.dongCode = restaurant.getDongCode();
        this.tellNumber = restaurant.getTellNumber();
        this.businessHourInfo = restaurant.getBusinessHourInfo();
        this.snsUrl = restaurant.getSnsUrl();
        this.menuList = restaurant.menuToString();
        this.optionsList = restaurant.optionsList();

    }
}
