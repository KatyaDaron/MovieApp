package katya.movieApp.services;

import jakarta.transaction.Transactional;

import java.math.BigDecimal;

public interface RatingService {
    @Transactional
    void addRatingToMovie(Long movieId, Long userId, BigDecimal ratingValue, String comment);

    @Transactional
    void deleteComment(Long ratingId, Long userId);

    @Transactional
    void deleteRating(Long ratingId, Long userId);

    @Transactional
    void editComment(Long ratingId, Long userId, String newComment);

    @Transactional
    void editRating(Long ratingId, Long userId, BigDecimal newRatingValue);
}
