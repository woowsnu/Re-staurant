package com.restaurant.app.controller;


import com.restaurant.app.DTO.ResponseDTO;
import com.restaurant.app.DTO.RestaurantDTO;
import com.restaurant.app.model.Restaurant;
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
@RequestMapping("/restaurant")
@Slf4j
public class RestaurantController {

    @Autowired
    RestaurantService restaurantService;

    // test : Create PlaceInfo
    @PostMapping("/create")
    public ResponseEntity<?> createPlaceInfo(@RequestBody RestaurantDTO restaurantDTO) {
        try {
            Restaurant savedRestaurant = restaurantService.createPlaceInfo(restaurantDTO);

            RestaurantDTO restaurantResponseDTO = RestaurantDTO.builder()
                    .restaurantCategory(savedRestaurant.getRestaurantCategory())
                    .restaurantName(savedRestaurant.getRestaurantName())
                    .fullAddress(savedRestaurant.getFullAddress())
                    .menuList(savedRestaurant.menuToString())
                    .build();

            return ResponseEntity.ok().body(restaurantResponseDTO);

        }

        catch(Exception e) {
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }



    // 식당이름으로 조회
    @GetMapping("/{restaurantName}")
    //@ResponseBody
    public ResponseEntity<?> findByRestaurantName(@PathVariable String restaurantName){

        try{

            List<Restaurant> restaurantList = restaurantService.findRestaurantByName(restaurantName);

            List<RestaurantDTO> restaurantsDTO = restaurantList.stream().map(RestaurantDTO::new).collect((Collectors.toList()));

            return ResponseEntity.ok().body(restaurantsDTO);
        }
        catch(Exception e) {
                ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
                return ResponseEntity.badRequest().body(responseDTO);
        }
    }


    //    지역별로 조회(시,군,구로 조회)



    //     식카테고리, 사용자위치 별로 조회


    // 상세페이지
    @GetMapping("/restaurantDetail/{busId}")
    public ResponseEntity<?> restaurantInfo(@PathVariable String busId) {

        try{
            Restaurant restaurant = restaurantService.findRestaurantByBusId(busId);

            RestaurantDTO restaurantResponseDTO = RestaurantDTO.builder()
                                            .restaurantCategory(restaurant.getRestaurantCategory())
                                            .restaurantName(restaurant.getRestaurantName())
                                            .fullAddress(restaurant.getFullAddress())
                                            .menuList(restaurant.menuToString())
                                            .build();


            return ResponseEntity.ok().body(restaurantResponseDTO);
        }
        catch(Exception e) {
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }


    }
}
