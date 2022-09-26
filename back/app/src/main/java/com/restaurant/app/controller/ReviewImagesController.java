package com.restaurant.app.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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
