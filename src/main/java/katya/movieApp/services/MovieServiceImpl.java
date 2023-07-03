package katya.movieApp.services;

import katya.movieApp.dtos.MovieDto;
import katya.movieApp.entities.Movie;
import katya.movieApp.entities.User;
import katya.movieApp.repositories.MovieRepository;
import katya.movieApp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MovieServiceImpl implements MovieService {
    @Autowired
    private MovieRepository movieRepository;
    @Autowired
    private UserRepository userRepository;

    //Getting all movies from db
    @Override
    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    //Adding a movie to db
    @Override
    @Transactional
    public void addMovie(MovieDto movieDto) {
        Movie movie = new Movie(movieDto);
        movieRepository.saveAndFlush(movie);
    }

    //Adding a movie to user's account
    @Override
    @Transactional
    public void addMovieToUser(Long movieId, Long userId) {
        Optional<Movie> movieOptional = movieRepository.findById(movieId);
        Optional<User> userOptional = userRepository.findById(userId);

        if (movieOptional.isPresent() && userOptional.isPresent()) {
            Movie movie = movieOptional.get();
            User user = userOptional.get();
            user.getMovies().add(movie);
        }
    }

    //Deleting a movie from user's account
    @Override
    @Transactional
    public void deleteMovieFromUser(Long movieId, Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.getMovies().removeIf(movie -> movie.getId().equals(movieId));
        }
    }

    //Displaying detailed information about a specific movie
    @Override
    public MovieDto getMovieById(Long movieId) {
        Optional<Movie> movieOptional = movieRepository.findById(movieId);
        if (movieOptional.isPresent()) {
            Movie movie = movieOptional.get();
            return new MovieDto(movie);
        }
        return null;
    }

    //Finding a movie by any character or word in the title
    @Override
    public List<MovieDto> findMoviesByTitle(String searchQuery) {
        List<Movie> movies = movieRepository.findByTitleContainingIgnoreCase(searchQuery);
        return movies.stream()
                .map(MovieDto::new)
                .collect(Collectors.toList());
    }
}