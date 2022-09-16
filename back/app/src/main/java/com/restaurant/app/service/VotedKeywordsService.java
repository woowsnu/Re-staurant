package com.restaurant.app.service;

import com.restaurant.app.DTO.VotedKeywordsDTO;
import com.restaurant.app.model.Restaurant;
import com.restaurant.app.model.VotedKeywords;
import com.restaurant.app.repository.RestaurantRepository;
import com.restaurant.app.repository.VotedKeywordsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class VotedKeywordsService {
    @Autowired
    private final VotedKeywordsRepository votedKeywordsRepository;

    private final RestaurantRepository restaurantRepository;

    public void createKeywords(VotedKeywordsDTO keywordsDTO) {

        Restaurant restaurant = restaurantRepository.findRestaurantByBusId(keywordsDTO.getBusId());

        if (restaurant == null) {
            throw new RuntimeException("해당 식당이 없습니다.");
        }

        VotedKeywords votedKeywords = VotedKeywords.builder()
                .restaurant(restaurant)
                .keywordsCode(keywordsDTO.getKeywordsCode())
                .keywordsName(keywordsDTO.getKeywordsName())
                .keywordsCount(keywordsDTO.getKeywordsCount())
                .build();

        votedKeywordsRepository.save(votedKeywords);
    }

}
