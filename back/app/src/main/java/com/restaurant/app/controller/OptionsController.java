package com.restaurant.app.controller;

import com.restaurant.app.DTO.OptionsDTO;
import com.restaurant.app.model.Options;
import com.restaurant.app.model.Restaurant;
import com.restaurant.app.service.OptionsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/options")
@CrossOrigin("*")
@Slf4j
public class OptionsController {

    @Autowired
    OptionsService optionsService;

    @GetMapping()
    public List<Options> findAll(){
        return optionsService.findAll();
    }

    //create
//    @PutMapping()
//    @RequestBody
//    public OptionsDTO optionsCreate (@PathVariable ){
//
//    }
}
