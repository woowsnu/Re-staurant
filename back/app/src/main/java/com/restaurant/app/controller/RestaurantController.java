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
    @PostMapping("/createRestaurantInfo")
    public ResponseEntity<?> createPlaceInfo(@RequestBody RestaurantDTO restaurantDTO) {

        System.out.println("createRestaurantInfo");

        System.out.println(restaurantDTO);
        try {
            Restaurant savedRestaurant = restaurantService.createPlaceInfo(restaurantDTO);

            ResponseDTO responseDTO = ResponseDTO.builder().result(1).build();
            return ResponseEntity.ok().body(responseDTO);

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


    // 시로 조회
    @GetMapping("/region/{siCode}")
    public ResponseEntity<?> findBySiCode(@PathVariable String siCode){
        try{
            List<Restaurant> restaurantList = restaurantService.findRestaurantBySiCode(siCode);
            List<RestaurantDTO> restaurantsDTO = restaurantList.stream().map(RestaurantDTO::new).collect((Collectors.toList()));

            return ResponseEntity.ok().body(restaurantsDTO);
        }
        catch(Exception e) {
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

    // 시군으로 조회
    @GetMapping("/region/{siCode}/{gunCode}")
    public ResponseEntity<?> findBySiCodeAndGunCode(@PathVariable String siCode, @PathVariable String gunCode){
        try{
            List<Restaurant> restaurantList = restaurantService.findRestaurantBySiCodeAndGunCode(siCode,gunCode);
            List<RestaurantDTO> restaurantsDTO = restaurantList.stream().map(RestaurantDTO::new).collect((Collectors.toList()));

            return ResponseEntity.ok().body(restaurantsDTO);
        }
        catch(Exception e) {
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }


    //시군구로 조회
    @GetMapping("/region/{siCode}/{gunCode}/{guCode}")
    public ResponseEntity<?> findBySiCodeAndGunCodeAndGuCode(@PathVariable String siCode, @PathVariable String gunCode, @PathVariable String guCode){
        try{
            List<Restaurant> restaurantList = restaurantService.findRestaurantBySiCodeAndGunCodeAndGuCode(siCode,gunCode, guCode);
            List<RestaurantDTO> restaurantsDTO = restaurantList.stream().map(RestaurantDTO::new).collect((Collectors.toList()));

            return ResponseEntity.ok().body(restaurantsDTO);
        }
        catch(Exception e) {
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }





    //     식카테고리, 사용자위치 별로 조회
    @GetMapping("/category/{restaurantCategory}")
    public ResponseEntity<?> findByRestaurantCategory(@PathVariable String restaurantCategory){
        try {
            List<Restaurant> restaurantList = restaurantService.findRestaurantByRestaurantCategory(restaurantCategory);
            List<RestaurantDTO> restaurantsDTO = restaurantList.stream().map(RestaurantDTO::new).collect((Collectors.toList()));
            return ResponseEntity.ok().body(restaurantsDTO);
        }
        catch(Exception e) {
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }


    // 상세페이지
    @GetMapping("/restaurantDetail/{busId}")
    public ResponseEntity<?> restaurantInfo(@PathVariable String busId) {

        try{
            Restaurant restaurant = restaurantService.findRestaurantByBusId(busId);

            RestaurantDTO restaurantResponseDTO = new RestaurantDTO(restaurant);


            return ResponseEntity.ok().body(restaurantResponseDTO);
        }
        catch(Exception e) {
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }


    }
}
