package com.restaurant.app.controller;


import com.restaurant.app.DTO.ResponseDTO;
import com.restaurant.app.DTO.RestaurantDTO;
import com.restaurant.app.Specification.RestaurantSpecs;
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
@CrossOrigin("*")
@Slf4j
public class RestaurantController {

    @Autowired
    RestaurantService restaurantService;

    // test : Create PlaceInfo
    @PostMapping("/createRestaurantInfo")
    public ResponseEntity<?> createPlaceInfo(@RequestBody RestaurantDTO restaurantDTO) {

        System.out.println("createRestaurantInfo");

        try {
            restaurantService.createPlaceInfo(restaurantDTO);

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

    // 시구으로 조회
    @GetMapping("/region/{siCode}/{guCode}")
    public ResponseEntity<?> findBySiCodeAndGuCode(@PathVariable String siCode, @PathVariable String guCode){
        try{
            List<Restaurant> restaurantList = restaurantService.findRestaurantBySiCodeAndGuCode(siCode,guCode);
            List<RestaurantDTO> restaurantsDTO = restaurantList.stream().map(RestaurantDTO::new).collect((Collectors.toList()));

            return ResponseEntity.ok().body(restaurantsDTO);
        }
        catch(Exception e) {
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }


    //시군동로 조회
    @GetMapping("/region/{siCode}/{guCode}/{dongCode}")
    public ResponseEntity<?> findBySiCodeAndGuCodeAndDongCode(@PathVariable String siCode, @PathVariable String guCode, @PathVariable String dongCode){
        try{
            List<Restaurant> restaurantList = restaurantService.findRestaurantBySiCodeAndGuCodeAndDongCode(siCode,guCode, dongCode);
            List<RestaurantDTO> restaurantsDTO = restaurantList.stream().map(RestaurantDTO::new).collect((Collectors.toList()));

            return ResponseEntity.ok().body(restaurantsDTO);
        }
        catch(Exception e) {
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }



    //     식카테고리, 사용자위치 별로 조회
//    @GetMapping("/category/{restaurantCategory}")
//    public ResponseEntity<?> restaurantCategory(@PathVariable String restaurantCategory ){
//        try{
//            List<Restaurant> restaurantList = restaurantService.findByRestaurantCategory(restaurantCategory);
//
//            List<RestaurantDTO> restaurantsDTO = restaurantList.stream().map(RestaurantDTO::new).collect((Collectors.toList()));
//
//
//            return ResponseEntity.ok().body(restaurantsDTO);
//        }
//        catch(Exception e) {
//            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
//            return ResponseEntity.badRequest().body(responseDTO);
//        }
//    }


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

//    @PostMapping("/search")
//    public ResponseEntity<?> search(@ModelAttribute RestaurantDTO restaurantDTO ){
//
//        try{
//            Optional<Restaurant> restaurantList = restaurantService.findByRestaurantSearch(restaurantDTO);
//
////            List<RestaurantDTO> restaurantsDTO = restaurantList.stream().map(RestaurantDTO::new).collect((Collectors.toList()));
//
//
//            return ResponseEntity.ok().body(restaurantList);
//        }
//        catch(Exception e) {
//            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
//            return ResponseEntity.badRequest().body(responseDTO);
//        }
//    }

    @PostMapping("/search")
    public List<Restaurant> getRestaurantList(@RequestParam(required = false) String restaurantName,
                                              @RequestParam(required = false) String largeCategory,
                                              @RequestParam(required = false) String midCategory) {
        if (largeCategory != null) {

            return restaurantRepository.findAll(RestaurantSpecs.withLargeCategory(largeCategory));
        }
        else if(midCategory != null){
            return restaurantRepository.findAll(RestaurantSpecs.withMidCategory(midCategory));
        }


        return restaurantRepository.findAll(RestaurantSpecs.withRestaurantName(restaurantName));
    }



}
