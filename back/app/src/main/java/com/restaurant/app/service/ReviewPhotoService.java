package com.restaurant.app.service;

import com.restaurant.app.DTO.ReviewPhotoDTO;
import com.restaurant.app.model.Review;
import com.restaurant.app.model.ReviewPhoto;
import com.restaurant.app.model.User;
import com.restaurant.app.repository.ReviewPhotoRepository;
import com.restaurant.app.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
//@RequiredArgsConstructor
public class ReviewPhotoService {
    @Autowired
    private final ReviewPhotoRepository reviewPhotoRepository;

    private final ReviewRepository reviewRepository;
//
//    public ReviewPhotoService(ReviewPhotoRepository reviewPhotoRepository){
//        this.reviewPhotoRepository=reviewPhotoRepository;
//    }
//    @Transactional
//    public Long saveImage(ReviewPhotoDTO reviewPhotoDTO){
//        return reviewPhotoDTO.save(reviewPhotoDTO.toEntity()).getImgIndex();
//    }
//
//    @Transactional
//    public ReviewPhotoDTO getReviewPhoto(Long imgIndex){
//        ReviewPhoto reviewPhoto = reviewPhotoRepository.findByImgIndex(imgIndex).get();
//
//        ReviewPhotoDTO reviewPhotoDTO = ReviewPhotoDTO.builder()
//                .imgIndex(reviewPhoto.getImgIndex())
//                .originImageName(reviewPhoto.getImageName())
//                .imagePath(reviewPhoto.getImagePath())
//                .builder();
//        return reviewPhotoDTO;
//    }

    private String uploadDir;

    public ReviewPhotoService(ReviewPhotoRepository reviewPhotoRepository, ReviewRepository reviewRepository) {
        this.reviewPhotoRepository = reviewPhotoRepository;
        this.reviewRepository = reviewRepository;
    }


//    public List<ReviewPhoto> imgUpload(User authedUser, ReviewPhotoDTO reviewPhotoDTO, MultipartFile file) {
        // File.seperator 는 OS종속적이다.
        // Spring에서 제공하는 cleanPath()를 통해서 ../ 내부 점들에 대해서 사용을 억제한다
//        Path copyOfLocation = Paths.get(uploadDir + File.separator + StringUtils.cleanPath(file.getOriginalFilename()));
//        try {
//            // inputStream을 가져와서
//            // copyOfLocation (저장위치)로 파일을 쓴다.
//            // copy의 옵션은 기존에 존재하면 REPLACE(대체한다), 오버라이딩 한다
//            Files.copy(file.getInputStream(), copyOfLocation, StandardCopyOption.REPLACE_EXISTING);
//        } catch (IOException e) {
//            e.printStackTrace();
//            throw new RuntimeException("Could not store file : " + file.getOriginalFilename());
//        }
//        return re

    @Transactional
    public List<ReviewPhoto> imgUpload(User authedUser, ReviewPhotoDTO reviewPhotoDTO, MultipartFile file, Long reviewIndex ){
//        List<ReviewPhoto> reviewPhoto = reviewPhotoRepository.findByImgIndex(imgIndex);
            Review review = reviewRepository.findReviewByReviewIndex(reviewIndex);
        ReviewPhoto reviewPhotos = ReviewPhoto.builder()
                .imgIndex(reviewPhotoDTO.getImgIndex())
                .originImageName(reviewPhotoDTO.getOriginImageName())
                .imageName(reviewPhotoDTO.getImageName())
                .imageUlr(reviewPhotoDTO.getImageUlr())
                .user(authedUser)
                .review(review)
                .build();

//        reviewPhotos.s
        ReviewPhoto saveReviewPhoto = reviewPhotoRepository.save(reviewPhotos);
        return reviewPhotoRepository.findReviewPhotoByReviewReviewIndex(reviewIndex);
    }
    }

