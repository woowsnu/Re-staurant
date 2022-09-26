package com.restaurant.app.DTO;


import com.restaurant.app.model.Menus;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class MenusDTO {

    private Long menuIndex;
    private String menuName;
    private String menuPrice;


    private String busId;

    //만약 관리자 또는 가게 운영자가 자신의 메뉴를 프론트엔드에서 등록하려는 경우 필요
    public MenusDTO(Menus menus){
        this.menuIndex = menus.getMenuIndex();
        this.menuName = menus.getMenuName();
        this.menuPrice = menus.getMenuPrice();
    }

}
