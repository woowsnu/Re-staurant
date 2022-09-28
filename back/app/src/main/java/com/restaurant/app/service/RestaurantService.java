package com.restaurant.app.service;

import com.restaurant.app.DTO.RestaurantDTO;
import com.restaurant.app.model.Restaurant;
import com.restaurant.app.repository.RestaurantRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class RestaurantService {

    @Autowired
    private RestaurantRepository restaurantRepository;

    // 레스토랑 등록 [admin 계정만 가능]
    public Restaurant createPlaceInfo(RestaurantDTO restaurantDTO) {

        if(restaurantRepository.findRestaurantByBusId(restaurantDTO.getBusId()) != null) {
            throw new RuntimeException("이미 DB에 저장되어있습니다.");
        }

        Restaurant restaurant = Restaurant.builder()
                                .busId(restaurantDTO.getBusId())
                                .restaurantCategory(restaurantDTO.getRestaurantCategory())
                                .restaurantName(restaurantDTO.getRestaurantName())
                                .tellNumber(restaurantDTO.getTellNumber())
                                .fullAddress(restaurantDTO.getFullAddress())
                                .fullRoadAddress(restaurantDTO.getFullRoadAddress())
                                .siCode(restaurantDTO.getSiCode())
                                .guCode(restaurantDTO.getGuCode())
                                .dongCode(restaurantDTO.getDongCode())
                                .businessHourInfo(restaurantDTO.getBusinessHourInfo())
                                .description(restaurantDTO.getDescription())
                                .x(restaurantDTO.getX())
                                .y(restaurantDTO.getY())
                                .avgRating(restaurantDTO.getAvgRating())
                                .authorCount(restaurantDTO.getAuthorCount())
                                .build();

        return restaurantRepository.save(restaurant);
    }

    public  List<Restaurant> findRestaurantByAuthorCount()
    {
        return   restaurantRepository.findTop10AllByOrderByAuthorCountDesc();
    }

    // 식당 이름으로 검색하는 경우 or 음식 카테고리로 검색하는 경우
    public List<RestaurantDTO> findRestaurantByRestaurantCategoryOrRestaurantName(String restaurantCategory,
                                                                                  String restaurantName){

        // 두가지 쿼리스트링으로 한번에 요청할 경우 예외처리
        if (restaurantCategory != null && restaurantName !=null) {
            throw new RuntimeException("카테고리, 음식점 이름 중 한가지만 적어주시기 바랍니다.");
        }

        // 검색된 레스토랑 리스트 저장
        List<Restaurant> restaurantList  = restaurantRepository.findRestaurantByRestaurantCategoryContainingIgnoreCaseOrRestaurantNameContainingIgnoreCase(restaurantCategory,restaurantName);

        // 레스토랑 리스트 내용 없으면 예외처리
        if (restaurantList.size() == 0) {
            throw new RuntimeException("식당이 없습니다.");
        }

        // 레스토랑 리스트 내용 있으면 DTO로 변환하여 리스트 반환
        return restaurantList.stream().map(RestaurantDTO::new).collect((Collectors.toList()));
    }

    // 지역별 레스토랑 조회
    public List<RestaurantDTO> findRestaurantByRegion(String siCode,String guCode, String dongCode) {
        List<Restaurant> restaurantList;

        // 지역 code가 모두 null이면 추가 연산없이 예외처리 반환
        if(siCode == null && guCode == null & dongCode == null) {
            throw new RuntimeException("해당 식당이 없습니다.");
        }

        if(siCode == null) {
            if(guCode == null) {
                // dongCode로 조회
                restaurantList = restaurantRepository.findRestaurantByDongCode(dongCode);
            }
            else{
                if(dongCode == null) {
                    // guCode로 조회
                    restaurantList = restaurantRepository.findRestaurantByGuCode(guCode);
                }
                else {
                    // guCode,dongCode로 조회
                    restaurantList = restaurantRepository.findRestaurantByGuCodeAndDongCode(guCode,dongCode);
                }
            }
        }
        else {
            if(guCode == null) {
                if(dongCode == null) {
                    // siCode로 조회
                    restaurantList = restaurantRepository.findRestaurantBySiCode(siCode);
                }
                else {
                    // siCode, dongCode로 조회
                    restaurantList = restaurantRepository.findRestaurantBySiCodeAndDongCode(siCode,dongCode);
                }
            }
            else {
                if(dongCode == null) {
                    // siCode, guCode로 조회
                    restaurantList = restaurantRepository.findRestaurantBySiCodeAndGuCode(siCode,guCode);
                }
                else {
                    // siCode, guCode, dongCode로 조회
                    restaurantList = restaurantRepository.findRestaurantBySiCodeAndGuCodeAndDongCode(siCode,guCode,dongCode);
                }
            }
        }

        // 해당 검색어로 조회가 안됐을 경우 예외처리
        if(restaurantList.size() == 0) {
            throw new RuntimeException("해당 식당이 없습니다.");
        }

        // 리스트에 담긴 데이터가 있다면 DTO로 변환하여 리스트 반환
        return restaurantList.stream().map(RestaurantDTO::new).collect((Collectors.toList()));
       }

       // busId로 레스토랑 조회
    public RestaurantDTO findRestaurantByBusId(String busId) {
        Restaurant restaurant = restaurantRepository.findRestaurantByBusId(busId);

        if (restaurant == null) {
            throw new RuntimeException("해당 식당이 없습니다.");
        }

        return new RestaurantDTO(restaurant);
    }
}
