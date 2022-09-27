package com.restaurant.app.controller;


import com.restaurant.app.DTO.ResponseDTO;
import com.restaurant.app.DTO.ReviewPhotoDTO;
import com.restaurant.app.model.ReviewPhoto;
import com.restaurant.app.model.User;
import com.restaurant.app.service.ReviewPhotoService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/reviewimg")
public class ReviewPhotoController {

    @Autowired
    private final ReviewPhotoService reviewIPhotoService;


    @GetMapping("/test")
    public String test() {
        return "upload";
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadeImg(@AuthenticationPrincipal User authedUser, ReviewPhotoDTO reviewPhotoDTO, @RequestPart MultipartFile image, Long reviewIndex) throws IOException {


        try {

            reviewIPhotoService.imgUpload(authedUser, reviewPhotoDTO, image, reviewIndex);
            ResponseDTO responseDTO = ResponseDTO.builder().result(1).build();
            return ResponseEntity.ok().body(responseDTO);

        } catch (Exception e) {
            System.out.println(e.getMessage());
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }

    }
}
