package com.restaurant.app.DTO;

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

}