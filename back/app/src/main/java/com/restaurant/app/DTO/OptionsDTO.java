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

    private Long optionIndex;

    private Long optionId;

    private String optionName;

    private int isCheck;
    private int orderCount;

    private String iconUrl;

    private String busId;


    public OptionsDTO(Options options){
        this.optionIndex = options.getOptionIndex();
        this.iconUrl = options.getIconUrl();
        this.isCheck = options.getIsCheck();
        this.orderCount = options.getOrderCount();
    }


}
