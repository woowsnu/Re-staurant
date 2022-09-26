package com.restaurant.app.controller;


import com.restaurant.app.model.ReviewImages;
import com.restaurant.app.service.ReviewImagesService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.net.URI;
import java.net.URISyntaxException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/reviewimg")
public class ReviewImagesController {

//    @Autowired
//    ReviewImagesService reviewImagesService;
//
//    @CrossOrigin(origins = {"http://localhost:3000"})
//    @PostMapping
//    public ResponseEntity<?> uploadeImg(  @RequestParam("user") String user,
//                                          @RequestParam("content") String content,
//                                         MultipartHttpServletRequest multipartHttpServletRequest throws URISyntaxException {
//        ReviewImages reviewImages = reviewImagesService.addReviewImg(ReviewImages.builder()
////                .user(user)
////                .content
//                .build(), multipartHttpServletRequest);
//
//        URI uriLocation = new ("/reviewImages/" + reviewImages.getReviewImages());
//        return ResponseEntity.created(uriLocation).body("{}");
//
//    }
}
