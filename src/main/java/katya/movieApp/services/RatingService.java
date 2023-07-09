package katya.movieApp.services;

import jakarta.transaction.Transactional;
import katya.movieApp.dtos.RatingDto;

import java.math.BigDecimal;
import java.util.List;

public interface RatingService {
    @Transactional
    void addRatingAndCommentToMovie(Long movieId, Long userId, RatingDto ratingDto);

    List<RatingDto> getAllCommentsForMovie(Long movieId);

    @Transactional
    void deleteComment(Long ratingId, Long userId);

    @Transactional
    void deleteRating(Long ratingId, Long userId);

    @Transactional
    void editComment(Long ratingId, Long userId, String newComment);

    List<RatingDto> getRatingsAndCommentsByUser(Long userId);
}