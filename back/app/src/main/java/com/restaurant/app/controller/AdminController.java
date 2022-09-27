package com.restaurant.app.controller;

import com.restaurant.app.DTO.*;
import com.restaurant.app.service.MenusService;
import com.restaurant.app.service.OptionsService;
import com.restaurant.app.service.RestaurantService;
import com.restaurant.app.service.VotedKeywordsService;
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
@RequestMapping("/admin")
@Slf4j
public class AdminController {

    @Autowired
    MenusService menusService;
    @Autowired
    private final VotedKeywordsService votedKeywordsService;
    private final RestaurantService restaurantService;
    private final OptionsService optionsService;

    // 레스토랑 프로필 등록
    @PostMapping("/createRestaurantInfo")
    public ResponseEntity<?> createPlaceInfo(@RequestBody RestaurantDTO restaurantDTO) {

        try {
            restaurantService.createPlaceInfo(restaurantDTO);

            // 성공했을 경우 result:1로 설정하여 프론트로 전달.
            ResponseDTO responseDTO = ResponseDTO.builder().result(1).build();
            return ResponseEntity.ok().body(responseDTO);
        }
        catch (Exception e) {
            // 실패했을 경우 예외사항 메세지 전달
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

    //    create
    @PostMapping("/createOptions")
    public ResponseEntity<?> save(@RequestBody OptionsDTO optionsDTO) {

        try {

            optionsService.save(optionsDTO);

            // 성공했을 경우 result:1로 설정하여 프론트로 전달.
            ResponseDTO responseDTO = ResponseDTO.builder().result(1).build();
            return ResponseEntity.ok().body(responseDTO);
        }
        catch (Exception e) {
            // 실패했을 경우 예외사항 메세지 전달
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

    @PostMapping("/createMenus")
    public ResponseEntity<?> createMenus(@RequestBody MenusDTO menusDTO) {
        try{
            menusService.createMenus(menusDTO);

            // 성공했을 경우 result:1로 설정하여 프론트로 전달.
            ResponseDTO responseDTO = ResponseDTO.builder().result(1).build();
            return ResponseEntity.ok().body(responseDTO);
        }
        catch (Exception e) {
            // 실패했을 경우 예외사항 메세지 전달
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

    @PostMapping("/createKeywords")
    public ResponseEntity<?> createKeywords(@RequestBody VotedKeywordsDTO keywordsDTO) {

        try {
            votedKeywordsService.createKeywords(keywordsDTO);

            // 성공했을 경우 result:1로 설정하여 프론트로 전달.
            ResponseDTO responseDTO = ResponseDTO.builder().result(1).build();
            return ResponseEntity.ok().body(responseDTO);
        }
        catch (Exception e) {
            // 실패했을 경우 예외사항 메세지 전달
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }
}
