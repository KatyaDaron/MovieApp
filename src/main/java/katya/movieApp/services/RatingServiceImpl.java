package katya.movieApp.services;

import jakarta.transaction.Transactional;
import katya.movieApp.dtos.RatingDto;
import katya.movieApp.entities.Movie;
import katya.movieApp.entities.Rating;
import katya.movieApp.entities.User;
import katya.movieApp.repositories.MovieRepository;
import katya.movieApp.repositories.RatingRepository;
import katya.movieApp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RatingServiceImpl implements RatingService {
    @Autowired
    private RatingRepository ratingRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MovieRepository movieRepository;

    @Override
    @Transactional
    public void addRatingToMovie(Long movieId, Long userId, BigDecimal ratingValue, String comment) {
        Optional<User> userOptional = userRepository.findById(userId);
        Optional<Movie> movieOptional = movieRepository.findById(movieId);

        if (userOptional.isPresent() && movieOptional.isPresent()) {
            User user = userOptional.get();
            Movie movie = movieOptional.get();

            Rating rating = new Rating(user, movie, ratingValue);
            if (comment != null && !comment.isEmpty()) {
                rating.setComment(comment);
            }

            ratingRepository.save(rating);
        }
    }

    @Override
    @Transactional
    public void deleteComment(Long ratingId, Long userId) {
        Optional<Rating> ratingOptional = ratingRepository.findById(ratingId);
        if (ratingOptional.isPresent()) {
            Rating rating = ratingOptional.get();
            if (rating.getUser().getId().equals(userId)) {
                rating.setComment(null);
                ratingRepository.save(rating);
            } else {
                System.out.println("You are not authorized to delete this comment");
            }
        } else {
            System.out.println("Rating not found");
        }
    }

    @Override
    @Transactional
    public void deleteRating(Long ratingId, Long userId) {
        Optional<Rating> ratingOptional = ratingRepository.findById(ratingId);
        if (ratingOptional.isPresent()) {
            Rating rating = ratingOptional.get();
            if (rating.getUser().getId().equals(userId)) {
                ratingRepository.delete(rating);
            } else {
                System.out.println("You are not authorized to delete this rating");
            }
        } else {
            System.out.println("Rating not found");
        }
    }

    @Override
    @Transactional
    public void editComment(Long ratingId, Long userId, String newComment) {
        Optional<Rating> ratingOptional = ratingRepository.findById(ratingId);
        if (ratingOptional.isPresent()) {
            Rating rating = ratingOptional.get();
            if (rating.getUser().getId().equals(userId)) {
                rating.setComment(newComment);
                ratingRepository.save(rating);
            } else {
                System.out.println("You are not authorized to edit this comment");
            }
        } else {
            System.out.println("Rating not found");
        }
    }

    @Override
    @Transactional
    public void editRating(Long ratingId, Long userId, BigDecimal newRatingValue) {
        Optional<Rating> ratingOptional = ratingRepository.findById(ratingId);
        if (ratingOptional.isPresent()) {
            Rating rating = ratingOptional.get();
            if (rating.getUser().getId().equals(userId)) {
                rating.setRatingValue(newRatingValue);
                ratingRepository.save(rating);
            } else {
                System.out.println("You are not authorized to edit this rating");
            }
        } else {
            System.out.println("Rating not found");
        }
    }

    @Override
    public List<RatingDto> getRatingsAndCommentsByUser(Long userId) {
        List<Rating> ratings = ratingRepository.findByUserId(userId);
        return ratings.stream()
                .map(RatingDto::new)
                .collect(Collectors.toList());
    }
}