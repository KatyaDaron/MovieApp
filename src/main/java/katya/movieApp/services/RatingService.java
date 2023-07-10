package katya.movieApp.services;

import jakarta.transaction.Transactional;
import katya.movieApp.dtos.RatingDto;

import java.math.BigDecimal;
import java.util.List;

public interface RatingService {
    @Transactional
    void addFeedback(Long movieId, Long userId, RatingDto ratingDto);

    List<RatingDto> getAllFeedbacks(Long movieId);

    @Transactional
    void deleteFeedback(Long ratingId, Long userId);

    @Transactional
    void editComment(Long ratingId, Long userId, String newComment);
}