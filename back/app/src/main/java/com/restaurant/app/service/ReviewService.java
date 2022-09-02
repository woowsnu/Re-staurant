package com.restaurant.app.service;

import com.restaurant.app.DTO.ReviewDTO;
import com.restaurant.app.model.Review;
import com.restaurant.app.model.User;
import com.restaurant.app.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {
    @Autowired
    private final ReviewRepository reviewRepository;

    public List<Review> save(User authedUser, ReviewDTO reviewDTO, String busId) {
        Review review = Review.builder()
                .busId(busId)
                .reviewTitle(reviewDTO.getReviewTitle())
                .reviewContent(reviewDTO.getReviewContent())
                .build();

        review.setUser(authedUser);

        Review savedReview = reviewRepository.save(review);
        System.out.println("savedReview" + savedReview);

        return reviewRepository.findReviewByUser(authedUser);
    }

    public Review update(User authedUser ,ReviewDTO updateReviewDTO, Long reviewIndex) {
        // 기존 review 로드
        Review currReview = reviewRepository.findReviewByReviewIndex(reviewIndex);
        System.out.println(currReview.getUser().getEmail() == authedUser.getEmail());
        System.out.println(authedUser.getEmail());
        // 기존 review작성자와 현재 로그인한 자의 email이 동일한지 확인.
        if (authedUser.getUserIndex() != currReview.getUser().getUserIndex()) {
            throw new RuntimeException("updateReview denied. invalid userIndex");
        }

        Review review = Review.builder()
                .reviewIndex(currReview.getReviewIndex())
                .user(currReview.getUser())
                .busId(currReview.getBusId())
                .reviewTitle(updateReviewDTO.getReviewTitle())
                .reviewContent(updateReviewDTO.getReviewContent())
                .build();

        return reviewRepository.save(review);
    }

    public Long delete(User authedUser, Long reviewIndex) {
        Review currReview = reviewRepository.findReviewByReviewIndex(reviewIndex);

        if (authedUser.getUserIndex() != currReview.getUser().getUserIndex()) {
            throw new RuntimeException("deleteReview denied. invalid userIndex");
        }

        return reviewRepository.deleteByReviewIndex(currReview.getReviewIndex());

    }
}
