package com.restaurant.app.controller;


import com.restaurant.app.DTO.OptionsDTO;
import com.restaurant.app.DTO.ResponseDTO;
import com.restaurant.app.model.Options;
import com.restaurant.app.service.OptionsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/options")
@Slf4j
public class OptionsController {

    private final OptionsService optionsService;

    //update
    @PutMapping("/update/{busId}")
    public ResponseEntity<?> update(@RequestBody OptionsDTO optionsDTO,@PathVariable String busId) {
        try {

            optionsService.update(optionsDTO,busId);

            ResponseDTO responseDTO = ResponseDTO.builder().result(1).build();

            return ResponseEntity.ok().body(responseDTO);

        } catch (Exception e) {

            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }
}
