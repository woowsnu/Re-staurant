package com.restaurant.app.controller;


import com.restaurant.app.DTO.MenusDTO;
import com.restaurant.app.DTO.ResponseDTO;
import com.restaurant.app.model.Menus;
import com.restaurant.app.service.MenusService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/menus")
@Slf4j
public class MenusController {

    @Autowired
    MenusService menusService;

    @PostMapping("/createMenus")
    public ResponseEntity<?> createMenus(@RequestBody MenusDTO menusDTO) {
        try{
            Menus menus = menusService.createMenus(menusDTO);

            MenusDTO responseMenusDTO = MenusDTO.builder()
                    .menuIndex(menus.getMenuIndex())
                    .menuName(menus.getMenuName())
                    .menuPrice(menus.getMenuPrice())
                    .build();
            return ResponseEntity.ok().body(responseMenusDTO);
        }
        catch (RuntimeException e) {
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }

    }


}
