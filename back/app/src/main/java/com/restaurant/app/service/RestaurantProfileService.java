package com.restaurant.app.service;

import com.restaurant.app.repository.RestaurantProfileRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class RestaurantProfileService {

    //서비스에서 꺼내올 메서드 레파지토리 연결

    private final RestaurantProfileRepository restaurantProfileRepository;
    //오브젝트 생성

    public List<RestaurantProfile> findAll() {
        return restaurantProfileRepository.findAll();
    }

    public RestaurantProfile findByIndex(Long index){
        RestaurantProfile restaurantProfile;
        try{
            restaurantProfile = restaurantProfileRepository.findByRestaurantProfileIndex(index);
        } catch (NullPointerException e) {
            throw new RuntimeException("가게 정보를 찾을 수 없습니다");
        }
        return restaurantProfile;
    }

}
