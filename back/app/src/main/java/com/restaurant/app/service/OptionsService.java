package com.restaurant.app.service;

import com.restaurant.app.model.Options;
import com.restaurant.app.repository.OptionsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class OptionsService {


    private final OptionsRepository optionsRepository;

    @Transactional
    public List<Options> findAll(){
        return optionsRepository.findAll();
    }


}
