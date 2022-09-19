package com.restaurant.app.service;

import com.restaurant.app.DTO.ReviewDTO;
import com.restaurant.app.model.Restaurant;
import com.restaurant.app.model.Review;
import com.restaurant.app.model.User;
import com.restaurant.app.repository.RestaurantRepository;
import com.restaurant.app.repository.ReviewRepository;
import com.restaurant.app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {
    @Autowired
    private final ReviewRepository reviewRepository;

    private  final RestaurantRepository restaurantRepository;

    private final UserRepository userRepository;

    public List<Review> save(User authedUser, ReviewDTO reviewDTO, String busId) {
        Restaurant restaurant = restaurantRepository.findRestaurantByBusId(busId);


        Review review = Review.builder()
                .user(authedUser)
                .restaurant(restaurant)
                .reviewTitle(reviewDTO.getReviewTitle())
                .reviewContent(reviewDTO.getReviewContent())
                .reviewImage(reviewDTO.getReviewImage())
                .revisit(reviewDTO.getRevisit())
                .tag(reviewDTO.getTag())
                .createDate(LocalDateTime.now())
                .build();

        review.setUser(authedUser);

        Review savedReview = reviewRepository.save(review);
        System.out.println("savedReview" + savedReview);

        return reviewRepository.findReviewByRestaurantBusId(busId);
    }

    public List<Review> findByEmail( User authedUser,String email){
        List<Review> review = reviewRepository.findOptionsByUserEmail(email);
        List<Review> reviews = reviewRepository.findReviewByUser(authedUser);
        return review;
    }

//    public List<Review> update(User authedUser ,ReviewDTO updateReviewDTO, Long busId , Long userIndex) {
//        // 기존 review 로드
//
////        Review currReview = reviewRepository.findReviewByReviewIndex(reviewIndex);
//        List<Review> reviewList = reviewRepository.findReviewByUser(authedUser);
//        User user = userRepository.findByUserIndex(userIndex);
//        Review reviews = reviewRepository.findReviewByUserIndex(userIndex);
//        Restaurant restaurant = restaurantRepository.findRestaurantByBusId(busId);
//        List<Review> reviewLists = reviewRepository.findReviewByRestaurantBusId(busId);
//
//        // 기존 review작성자와 현재 로그인한 자의 email이 동일한지 확인.
//        if (authedUser.getUserIndex() != reviews.getUser().getUserIndex()) {
//            throw new RuntimeException("updateReview denied. invalid userIndex");
//        }
//
//        Review review = Review.builder()
//                .reviewIndex(reviews.getReviewIndex())
////                .user(currReview.getUser())
//                .restaurant(restaurant)
//                .reviewTitle(updateReviewDTO.getReviewTitle())
//                .reviewContent(updateReviewDTO.getReviewContent())
//                .build();
//        Review reviewUpdate = reviewRepository.save(review);
//        return reviewRepository.findReviewByRestaurantBusId(busId);
//    }


    public Long delete(User authedUser, Long reviewIndex) {
        Review currReview = reviewRepository.findReviewByReviewIndex(reviewIndex);

        if (authedUser.getUserIndex() != currReview.getUser().getUserIndex()) {
            throw new RuntimeException("deleteReview denied. invalid userIndex");
        }

        return reviewRepository.deleteByReviewIndex(currReview.getReviewIndex());

    }
}