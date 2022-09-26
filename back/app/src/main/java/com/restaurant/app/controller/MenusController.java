package com.restaurant.app.controller;


import com.restaurant.app.DTO.MenusDTO;
import com.restaurant.app.DTO.ResponseDTO;
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
            menusService.createMenus(menusDTO);

            ResponseDTO responseDTO = ResponseDTO.builder().result(1).build();

            return ResponseEntity.ok().body(responseDTO);
        }
        catch (RuntimeException e) {
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }

    }


}
