package com.restaurant.app.service;

import com.restaurant.app.DTO.ReviewPhotoDTO;
import com.restaurant.app.model.Review;
import com.restaurant.app.model.ReviewPhoto;
import com.restaurant.app.model.User;
import com.restaurant.app.repository.ReviewPhotoRepository;
import com.restaurant.app.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ReviewPhotoService {
    @Autowired
    private final ReviewPhotoRepository reviewPhotoRepository;

    private final ReviewRepository reviewRepository;


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
    public List<ReviewPhoto> imgUpload(User authedUser, ReviewPhotoDTO reviewPhotoDTO, MultipartFile image, Long reviewIndex) throws IOException {
        try {

            Review review = reviewRepository.findReviewByReviewIndex(reviewIndex);
            String separ = File.separator;

            File file = new File("");
//            String rootPath = file.getAbsolutePath().split("src")[0];
            String rootPath = "C:/Users/Leesumin/Desktop/흰콩TV";
//            String savePath = rootPath + separ + "reviewImg" + separ+today;
            String savePath = rootPath + separ ;
            if(!new  File(savePath).exists()) {
                try {
                    new File(savePath).mkdir();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
                String originFileName = image.getOriginalFilename();
//                String saveFileName = UUID.randomUUID().toString() + originFileName.substring(originFileName.lastIndexOf("."));
                String saveFileName = originFileName;

                String filePath = savePath + separ + saveFileName;
                image.transferTo(new File(filePath));
                ReviewPhoto reviewPhoto = reviewPhotoDTO.toEntity();
                reviewPhoto.setImageUlr(filePath);

                ReviewPhoto reviewPhotos = ReviewPhoto.builder()
                        .imageUlr(filePath)
                                .user(authedUser)
                                        .review(review)
                                                .build();

                ReviewPhoto savePhoto =  reviewPhotoRepository.save(reviewPhotos);

                return reviewPhotoRepository.findReviewPhotoByReviewReviewIndex(reviewIndex);

        }
        catch (Exception e){
            e.printStackTrace();
            return null;
        }


    }
}

