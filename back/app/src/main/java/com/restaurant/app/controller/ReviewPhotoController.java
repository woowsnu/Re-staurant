package com.restaurant.app.controller;


import com.restaurant.app.DTO.ResponseDTO;
import com.restaurant.app.DTO.ReviewPhotoDTO;
import com.restaurant.app.model.User;
import com.restaurant.app.service.ReviewPhotoService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/reviewimg")
public class ReviewPhotoController {

    @Autowired
    private final ReviewPhotoService reviewIPhotoService;

//    @CrossOrigin(origins = {"http://localhost:3000"})

    @GetMapping("/test")
    public String test() {
        return "upload";
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadeImg(@AuthenticationPrincipal User authedUser, ReviewPhotoDTO reviewPhotoDTO, @RequestParam () MultipartFile file, Long reviewIndex) throws IOException {

//        URI uriLocation = new ("/reviewImages/" + reviewImages.getReviewImages());
//        return ResponseEntity.created(uriLocation).body("{}");
        try {
            if(!file.isEmpty()){
                String fullPath = "C:\\Users\\" + file.getOriginalFilename();
                file.transferTo(new File(fullPath));
            }

            reviewIPhotoService.imgUpload(authedUser, reviewPhotoDTO, file, reviewIndex);

            ResponseDTO responseDTO = ResponseDTO.builder().result(1).build();
            return ResponseEntity.ok().body(responseDTO);

        } catch (Exception e) {
            System.out.println(e.getMessage());
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }
}
