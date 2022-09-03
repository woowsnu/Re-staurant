package com.restaurant.app.controller;

import com.restaurant.app.dto.RestaurantProfileDTO;
import com.restaurant.app.model.RestaurantProfile;
import com.restaurant.app.service.RestaurantProfileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/restaurantprofile")
@CrossOrigin("*")
@Slf4j
public class RestaurantProfileController {

    @Autowired
    RestaurantProfileService restaurantProfileService;


//    @GetMapping("/")
//    public ResponseEntity<?> findAll(){
//        ResponseEntity<?> restaurantProfiles = restaurantProfileService.findAll();
//        //List<RestaurantProfileDTO> dtos = restaurantProfiles.stream().map(restaurantprofileDTO ::new).collect(collectors.tolist());
//        //return ResponseEntity.ok(dtos);
//    }

    //프로필 번호로 정보 조회
    @GetMapping()
    public ResponseEntity<?> findAll() {
//        log.debug();
//        log.warn();
        log.info("hello");
//        log.error("error");
        List<RestaurantProfile> restaurantProfiles = restaurantProfileService.findAll();
        List<RestaurantProfileDTO> dtos = restaurantProfiles.stream().map(RestaurantProfileDTO::new).collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }
}
