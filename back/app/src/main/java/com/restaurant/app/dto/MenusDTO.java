package com.restaurant.app.DTO;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MenusDTO {

    private Long menuIndex;
    private String menuName;
    private String menuPrice;


    //만약 관리자 또는 가게 운영자가 자신의 메뉴를 프론트엔드에서 등록하려는 경우 필요
    public MenusDTO(MenusDTO menuseDTO){
        this.menuIndex = getMenuIndex();
        this.menuName = getMenuName();
        this.menuPrice = getMenuPrice();
    }

}
