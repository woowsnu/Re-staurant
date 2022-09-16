package com.restaurant.app.service;

import com.restaurant.app.DTO.OptionsDTO;
import com.restaurant.app.model.Options;
import com.restaurant.app.model.Restaurant;
import com.restaurant.app.repository.OptionsRepository;
import com.restaurant.app.repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class OptionsService {

    private final RestaurantRepository restaurantRepository;
    @Autowired
    private final OptionsRepository optionsRepository;

    @Transactional
    public List<Options> findAll() {
        return optionsRepository.findAll();
    }
//

    public List<Options> save(OptionsDTO optionsDTO) {
        Restaurant restaurant = restaurantRepository.findRestaurantByBusId(optionsDTO.getBusId());

        if (restaurant == null) {
            throw new RuntimeException("해당 식당이 없습니다.");
        }
        Options options = Options.builder()
                .optionId(optionsDTO.getOptionId())
                .optionName(optionsDTO.getOptionName())
                .isCheck(optionsDTO.getIsCheck())
                .orderCount(optionsDTO.getOrderCount())
                .iconUrl(optionsDTO.getIconUrl())
                .restaurant(restaurant)
                .build();

        optionsRepository.save(options);

        return optionsRepository.findOptionsByRestaurantBusId(optionsDTO.getBusId());


    }

//    public List<Options> findByRestaurant(OptionsDTO optionsDTO, String busId) {
//        try {
//            Restaurant restaurant = restaurantRepository.findRestaurantByBusId(busId);
//            List<Options> option = optionsRepository.findOptionsByRestaurantBusId(busId);
//            Options options = Options.builder()
//                    .restaurant(restaurant)
//                    .optionIndex(optionsDTO.getOptionIndex())
//                    .iconUrl(optionsDTO.getIconUrl())
//                    .isCheck(optionsDTO.getIsCheck())
//                    .optionNum(optionsDTO.getOptionNum())
//                    .optionOrder(optionsDTO.getOptionOrder())
//                    .build();
//            return
//        } catch (Exception e) {
//            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
//            return ResponseEntity.badRequest().body(responseDTO);
//        }
//
//    }

    public void update(OptionsDTO optionsDTO, String busId) {
        Restaurant restaurant = restaurantRepository.findRestaurantByBusId(busId);
        List<Options> option = optionsRepository.findOptionsByRestaurantBusId(busId);

        if(option == null || restaurant == null) {
            throw new RuntimeException("invalid options");
        }

        Options options = Options.builder()
                .optionIndex(optionsDTO.getOptionIndex())
                .optionId(optionsDTO.getOptionId())
                .optionName(optionsDTO.getOptionName())
                .isCheck(optionsDTO.getIsCheck())
                .orderCount(optionsDTO.getOrderCount())
                .iconUrl(optionsDTO.getIconUrl())
                .restaurant(restaurant)
                .build();

        optionsRepository.save(options);
    }

//    @Override
    @Transactional
    public void  delete(String busId) {
//        Restaurant restaurant = restaurantRepository.findRestaurantByBusId(busId);
//        Options option = optionsRepository.findOptionsByRestaurantBusId(busId);
//        Options option = optionsRepository.findByRestaurantOptionIndex(restaurantOptionIndex);
//        optionsRepository.delete(option);

        List<Options> option = optionsRepository.findOptionsByRestaurantBusId(busId);
//                .orElseThrow(() ->
//                new IllegalArgumentException("존재하지 않습니다. busId=" + busId));
//        optionsRepository.delete(options);

//        optionsRepository.deleteById(busId);
//        Options option = findById(restaurantOptionIndex);
//        if(option.belongsToResatuarna(busId)){
//            optionsRepository.deleteById(restaurantOptionIndex);
//        }
//        Options optionDelete = optionsRepository.save(options);
//        return optionsRepository.findOptionsByRestaurantBusId(busId);
//        return optionsRepository.deleteOptionsByRestaurantBusId();
//        return busId;

    }


}


