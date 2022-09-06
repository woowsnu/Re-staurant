package com.restaurant.app.DTO;

import com.restaurant.app.model.Menus;
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
    private String restaurantCategory;   //레스토랑 카테고리
    private String restaurantName;
    private Float x;
    private Float y;
    private String fullAddress;
    private String fullRoadAddress;

    private String siCode;

    private String gunCode;

    private String guCode;
    private String tellNumber;
    private String businessHourInfo;
    private String snsUrl;

    private String busId;
    private String menuList;
    private String optionsList;

    public RestaurantDTO(Restaurant restaurant) {
        this.restaurantIndex = restaurant.getRestaurantIndex();
        this.restaurantCategory = restaurant.getRestaurantCategory();
        this.restaurantName = restaurant.getRestaurantName();
        this.x = restaurant.getX();
        this.y = restaurant.getY();
        this.fullAddress = restaurant.getFullAddress();
        this.fullRoadAddress = restaurant.getFullRoadAddress();
        this.siCode = restaurant.getSiCode();
        this.gunCode = restaurant.getGunCode();
        this.guCode = restaurant.getGuCode();
        this.tellNumber = restaurant.getTellNumber();
        this.businessHourInfo = restaurant.getBusinessHourInfo();
        this.snsUrl = restaurant.getSnsUrl();
        this.busId = restaurant.getBusId();
        this.menuList = restaurant.menuToString();
        this.optionsList = restaurant.optionsList();

    }

    //관리자 또는 가게 운영자가 자신의 가게 프로필을 프론트엔드에서 등록하려는 경우 필요


}
