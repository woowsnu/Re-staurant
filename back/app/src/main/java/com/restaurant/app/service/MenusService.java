package com.restaurant.app.service;

import com.restaurant.app.DTO.MenusDTO;
import com.restaurant.app.model.Menus;
import com.restaurant.app.model.Restaurant;
import com.restaurant.app.repository.MenusRepository;
import com.restaurant.app.repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class MenusService {

    private final RestaurantRepository restaurantRepository;
    private final MenusRepository menusRepository;

    public List<Menus> findAll(){
        return menusRepository.findAll();
    }


    public void createMenus(MenusDTO menusDTO) {

        Restaurant restaurant = restaurantRepository.findRestaurantByBusId(menusDTO.getBusId());

        if(restaurant == null) {
            throw new RuntimeException("해당 식당이 등록되어있지 않습니다.");
        }

         Menus menus = Menus.builder()
                 .menuName(menusDTO.getMenuName())
                 .menuPrice(menusDTO.getMenuPrice())
                 .restaurant(restaurant)
                 .build();

          menusRepository.save(menus);

    }

}
