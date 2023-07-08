package katya.movieApp.services;

import jakarta.transaction.Transactional;
import katya.movieApp.dtos.RatingDto;

import java.math.BigDecimal;
import java.util.List;

public interface RatingService {
    @Transactional
    void addRatingToMovie(Long movieId, Long userId, RatingDto ratingDto);

    @Transactional
    void deleteComment(Long ratingId, Long userId);

    @Transactional
    void deleteRating(Long ratingId, Long userId);

    @Transactional
    void editComment(Long ratingId, Long userId, String newComment);

    @Transactional
    void editRating(Long ratingId, Long userId, BigDecimal newRatingValue);

    List<RatingDto> getRatingsAndCommentsByUser(Long userId);
}
