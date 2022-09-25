//package com.restaurant.app.controller;
//
//
//import com.restaurant.app.model.User;
//import com.restaurant.app.service.ReviewIPhotoService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.annotation.AuthenticationPrincipal;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.util.List;
//
//@RestController
//@RequiredArgsConstructor
//@RequestMapping("/reviewimg")
//public class ReviewPhotoController {
//
//    @Autowired
//    private  final ReviewIPhotoService reviewIPhotoService;
//
////    @CrossOrigin(origins = {"http://localhost:3000"})
//    @PostMapping
//    public ResponseEntity<?> uploadeImg(@AuthenticationPrincipal User authedUser, @RequestPart(value="image", required=false) List<MultipartFile> multipartFileList)
//    {
//
////        URI uriLocation = new ("/reviewImages/" + reviewImages.getReviewImages());
////        return ResponseEntity.created(uriLocation).body("{}");
//
//    }
//}
