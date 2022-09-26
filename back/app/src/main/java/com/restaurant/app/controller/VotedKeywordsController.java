package com.restaurant.app.controller;

import com.restaurant.app.DTO.ResponseDTO;
import com.restaurant.app.DTO.VotedKeywordsDTO;
import com.restaurant.app.service.VotedKeywordsService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/keywords")
public class VotedKeywordsController {

    @Autowired
    private final VotedKeywordsService votedKeywordsService;

    @PostMapping("/createKeywords")
    public ResponseEntity<?> createKeywords(@RequestBody VotedKeywordsDTO keywordsDTO) {
        System.out.println("create_keywords");

        try {
            votedKeywordsService.createKeywords(keywordsDTO);

            ResponseDTO responseDTO = ResponseDTO.builder().result(1).build();

            return ResponseEntity.ok().body(responseDTO);
        }
        catch (RuntimeException e) {
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();

            return ResponseEntity.badRequest().body(responseDTO);
        }
    }
}
