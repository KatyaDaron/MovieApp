package katya.movieApp.services;

import jakarta.transaction.Transactional;
import katya.movieApp.entities.Movie;
import katya.movieApp.entities.Rating;
import katya.movieApp.entities.User;
import katya.movieApp.repositories.MovieRepository;
import katya.movieApp.repositories.RatingRepository;
import katya.movieApp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Optional;

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
}