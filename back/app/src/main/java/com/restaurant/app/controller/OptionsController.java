package com.restaurant.app.controller;

import com.restaurant.app.model.Options;
import com.restaurant.app.service.OptionsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
