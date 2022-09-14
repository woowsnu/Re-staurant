package com.restaurant.app.DTO;

import com.restaurant.app.model.Options;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OptionsDTO {

    private Long restaurantOptionIndex;
    private String iconUrl;
    private int isCheck;
    private int optionNum;
    private int optionOrder;

    public OptionsDTO(Options options){
        this.restaurantOptionIndex = options.getRestaurantOptionIndex();
        this.iconUrl = options.getIconUrl();
        this.isCheck = options.getIsCheck();
        this.optionNum = options.getOptionNum();
        this.optionOrder = options.getOptionOrder();
    }

}
