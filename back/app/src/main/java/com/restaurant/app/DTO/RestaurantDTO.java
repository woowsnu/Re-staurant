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
    private String largeCategory;   // 대분류
    private String midCategory;   // 소분류
    private String restaurantName;
    private Float x;
    private Float y;
    private String description;
    private String fullAddress;
    private String fullRoadAddress;
    private String siCode;
    private String guCode;
    private String dongCode;
    private String tellNumber;
    private String businessHourInfo;
    private String snsUrl;

    private Float avgRating;

    private Long authorCount;
    private String menuList;
    private String optionsList;
    private String reviewList;


    public RestaurantDTO(Restaurant restaurant) {
        this.restaurantIndex = restaurant.getRestaurantIndex();
        this.busId = restaurant.getBusId();
        this.largeCategory = restaurant.getLargeCategory();
        this.midCategory = restaurant.getMidCategory();
        this.restaurantName = restaurant.getRestaurantName();
        this.description = restaurant.getDescription();
        this.restaurantName = restaurant.getRestaurantName();
        this.x = restaurant.getX();
        this.y = restaurant.getY();
        this.fullAddress = restaurant.getFullAddress();
        this.fullRoadAddress = restaurant.getFullRoadAddress();
        this.siCode = restaurant.getSiCode();
        this.dongCode = restaurant.getDongCode();
        this.guCode = restaurant.getGuCode();
        this.tellNumber = restaurant.getTellNumber();
        this.businessHourInfo = restaurant.getBusinessHourInfo();
        this.avgRating = restaurant.getAvgRating();
        this.authorCount = restaurant.getAuthorCount();
        this.snsUrl = restaurant.getSnsUrl();

        this.menuList = restaurant.menuToString();
        this.optionsList = restaurant.optionsList();
        this.reviewList = restaurant.reviewList();


    }
}
