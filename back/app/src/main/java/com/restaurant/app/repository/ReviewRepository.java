package com.restaurant.app.repository;

import com.restaurant.app.model.Review;
import com.restaurant.app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review,Long> {

    public List<Review> findReviewByUser(User user);


    public Review findReviewByReviewIndex(Long reviewIndex);

    @Transactional
    public Long deleteByReviewIndex(Long reviewIndex);
    List<Review> findReviewByRestaurantBusId(String busId);


}