package katya.movieApp.services;

import jakarta.transaction.Transactional;
import katya.movieApp.dtos.MovieDto;
import katya.movieApp.dtos.RatingDto;
import katya.movieApp.dtos.UserDto;
import katya.movieApp.entities.Movie;
import katya.movieApp.entities.Rating;
import katya.movieApp.entities.User;
import katya.movieApp.repositories.MovieRepository;
import katya.movieApp.repositories.RatingRepository;
import katya.movieApp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public void addFeedback(Long movieId, Long userId, RatingDto ratingDto) {
        Optional<User> userOptional = userRepository.findById(userId);
        Optional<Movie> movieOptional = movieRepository.findById(movieId);

        if (userOptional.isPresent() && movieOptional.isPresent()) {
            User user = userOptional.get();
            Movie movie = movieOptional.get();

            Rating rating = new Rating(ratingDto, user, movie);

            ratingRepository.save(rating);
        }
    }

    @Override
    public List<RatingDto> getAllFeedbacks(Long movieId) {
        List<Rating> ratings = ratingRepository.findByMovieIdOrderByIdDesc(movieId);
        return ratings.stream()
                .map(rating -> new RatingDto(rating, new UserDto(rating.getUser()), new MovieDto(rating.getMovie())))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void deleteFeedback(Long ratingId, Long userId) {
        Optional<Rating> ratingOptional = ratingRepository.findById(ratingId);
        if (ratingOptional.isPresent()) {
            Rating rating = ratingOptional.get();
            if (rating.getUser().getId().equals(userId)) {
                ratingRepository.delete(rating);
            } else {
                System.out.println("You are not authorized to delete this comment");
            }
        } else {
            System.out.println("Rating not found");
        }
    }

    @Override
    @Transactional
    public void editFeedback(Long ratingId, Long userId, RatingDto newFeedback) {
        Optional<Rating> ratingOptional = ratingRepository.findById(ratingId);
        if (ratingOptional.isPresent()) {
            Rating rating = ratingOptional.get();
            if (rating.getUser().getId().equals(userId)) {
                rating.setComment(newFeedback.getComment());
                rating.setRatingValue(newFeedback.getRatingValue());
                ratingRepository.save(rating);
            } else {
                System.out.println("You are not authorized to edit this comment");
            }
        } else {
            System.out.println("Rating not found");
        }
    }
}