package katya.movieApp.services;

import jakarta.transaction.Transactional;

import java.math.BigDecimal;

public interface RatingService {
    @Transactional
    void addRatingToMovie(Long movieId, Long userId, BigDecimal ratingValue, String comment);
}
