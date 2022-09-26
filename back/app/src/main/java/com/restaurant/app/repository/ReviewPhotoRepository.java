package com.restaurant.app.repository;

import com.restaurant.app.model.ReviewPhoto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewPhotoRepository extends JpaRepository<ReviewPhoto, Long> {

    List<ReviewPhoto> findByImgIndex(Long imgIndex);

    List<ReviewPhoto> findReviewPhotoByReviewReviewIndex(Long reviewIndex);
}
