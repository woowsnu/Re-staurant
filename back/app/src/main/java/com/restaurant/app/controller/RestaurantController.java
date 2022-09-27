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

    // 식당이름으로 조회
    @GetMapping("/search")
    //@ResponseBody
    public ResponseEntity<?> findByRestaurantName(@RequestParam(value="restaurantName") String restaurantName){
        System.out.println("rest :" + restaurantName);
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

    // 시로 조회
    @GetMapping("/region")
    public ResponseEntity<?> findBySiCode(@RequestParam(value="siCode", required = false) String siCode,
                                          @RequestParam(value="guCode", required = false) String guCode,
                                          @RequestParam(value="dongCode", required = false) String dongCode){

        try{
            List<RestaurantDTO> restaurantList = restaurantService.findRestaurantByRegion(siCode,guCode,dongCode);
//
            return ResponseEntity.ok().body(null);
        }
        catch(Exception e) {
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

    // 시구으로 조회
//    @GetMapping("/region/{siCode}/{guCode}")
//    public ResponseEntity<?> findBySiCodeAndGuCode(@PathVariable String siCode, @PathVariable String guCode){
//        try{
//            List<Restaurant> restaurantList = restaurantService.findRestaurantBySiCodeAndGuCode(siCode,guCode);
//            List<RestaurantDTO> restaurantsDTO = restaurantList.stream().map(RestaurantDTO::new).collect((Collectors.toList()));
//
//            return ResponseEntity.ok().body(restaurantsDTO);
//        }
//        catch(Exception e) {
//            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
//            return ResponseEntity.badRequest().body(responseDTO);
//        }
//    }
//
//
//    //시군동로 조회
//    @GetMapping("/region/{siCode}/{guCode}/{dongCode}")
//    public ResponseEntity<?> findBySiCodeAndGuCodeAndDongCode(@PathVariable String siCode, @PathVariable String guCode, @PathVariable String dongCode){
//        try{
//            List<Restaurant> restaurantList = restaurantService.findRestaurantBySiCodeAndGuCodeAndDongCode(siCode,guCode, dongCode);
//            List<RestaurantDTO> restaurantsDTO = restaurantList.stream().map(RestaurantDTO::new).collect((Collectors.toList()));
//
//            return ResponseEntity.ok().body(restaurantsDTO);
//        }
//        catch(Exception e) {
//            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
//            return ResponseEntity.badRequest().body(responseDTO);
//        }
//    }
//
//
//
//    //     식카테고리, 사용자위치 별로 조회
//   @GetMapping("/category")
//   public ResponseEntity<?> restaurantCategory(@RequestParam String restaurantCategory ){
//       try{
//           List<Restaurant> restaurantList = restaurantService.findRestaurantByRestaurantCategory(restaurantCategory);
//
//           List<RestaurantDTO> restaurantsDTO = restaurantList.stream().map(RestaurantDTO::new).collect((Collectors.toList()));
//
//
//           return ResponseEntity.ok().body(restaurantsDTO);
//       }
//       catch(Exception e) {
//           ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
//           return ResponseEntity.badRequest().body(responseDTO);
//       }
//   }
//
//
//   //전체검색
////    @GetMapping("/search")
////    public ResponseEntity<?> restaurantSearch(@RequestParam(required = false) String restaurantCategory,@RequestParam(required = false) String restaurantName ){
////        try{
////            List<Restaurant> restaurantList = restaurantService.findRestaurantByRestaurantCategoryOrRestaurantName(restaurantCategory,restaurantName);
////
////            List<RestaurantDTO> restaurantsDTO = restaurantList.stream().map(RestaurantDTO::new).collect((Collectors.toList()));
////
////
////            return ResponseEntity.ok().body(restaurantsDTO);
////        }
////        catch(Exception e) {
////            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
////            return ResponseEntity.badRequest().body(responseDTO);
////        }
////    }
//
//    @GetMapping("/search2")
//    public ResponseEntity<?> restaurantSearch2(@RequestBody RestaurantDTO restaurantDTO ){
//        try{
//            List<Restaurant> restaurantList = restaurantService.findRestaurant(restaurantDTO);
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
//
//
//
//
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
