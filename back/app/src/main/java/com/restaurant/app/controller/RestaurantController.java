package com.restaurant.app.controller;


import com.restaurant.app.DTO.ResponseDTO;
import com.restaurant.app.DTO.RestaurantDTO;
import com.restaurant.app.model.Restaurant;
import com.restaurant.app.repository.RestaurantRepository;
import com.restaurant.app.service.RestaurantService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@Slf4j
public class RestaurantController {

    @Autowired
    RestaurantService restaurantService;

    //전체검색
    // 식당 이름으로 검색하는 경우 or 음식 카테고리로 검색하는 경우
    @GetMapping("/search")
    public ResponseEntity<?> restaurantSearch(@RequestParam(required = false) String restaurantCategory,@RequestParam(required = false) String restaurantName ){
        try{
            List<RestaurantDTO> restaurantDTOList = restaurantService.findRestaurantByRestaurantCategoryOrRestaurantName(restaurantCategory,restaurantName);

            return ResponseEntity.ok().body(restaurantDTOList);
        }
        catch(Exception e) {
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

    // 지역별로 조회(siCode/guCode/dongCode 등으로 판별)
    @GetMapping("/region")
    public ResponseEntity<?> findBySiCode(@RequestParam(value="siCode", required = false) String siCode,
                                          @RequestParam(value="guCode", required = false) String guCode,
                                          @RequestParam(value="dongCode", required = false) String dongCode){

        try{
            List<RestaurantDTO> restaurantList = restaurantService.findRestaurantByRegion(siCode,guCode,dongCode);

            return ResponseEntity.ok().body(restaurantList);
        }
        catch(Exception e) {
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

    // 상세페이지
    @GetMapping("/restaurantDetail/{busId}")
    public ResponseEntity<?> restaurantInfo(@PathVariable String busId) {

        try {
            RestaurantDTO restaurantResponseDTO = restaurantService.findRestaurantByBusId(busId);

            return ResponseEntity.ok().body(restaurantResponseDTO);
        }
        catch (Exception e) {
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }
}
