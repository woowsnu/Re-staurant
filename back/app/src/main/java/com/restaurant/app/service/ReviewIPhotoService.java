//package com.restaurant.app.service;
//
//import com.restaurant.app.DTO.ReviewPhotoDTO;
//import com.restaurant.app.model.ReviewPhoto;
//import com.restaurant.app.repository.ReviewPhotoRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//@Service
//@RequiredArgsConstructor
//public class ReviewIPhotoService {
//    private final ReviewPhotoRepository reviewPhotoRepository;
//
//    @Transactional
//    public Long saveImage(ReviewPhotoDTO reviewPhotoDTO){
//        return reviewPhotoDTO.save(reviewPhotoDTO.toEntity()).getImgIndex();
//    }
//
//    @Transactional
//    public ReviewPhotoDTO getReviewPhoto(Long imgIndex){
//        ReviewPhoto reviewPhoto = reviewPhotoRepository.findByImgIndex(imgIndex).get();
//
//        ReviewPhotoDTO reviewPhotoDTO = ReviewPhotoDTO.
//    }
//}
