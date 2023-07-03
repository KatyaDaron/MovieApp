package katya.movieApp.services;

import katya.movieApp.dtos.MovieDto;
import katya.movieApp.entities.Movie;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface MovieService {
    //Getting all movies from db
    List<Movie> getAllMovies();

    //Adding a movie to db
    @Transactional
    void addMovie(MovieDto movieDto);

    //Adding a movie to user's account
    @Transactional
    void addMovieToUser(Long movieId, Long userId);

    //Deleting a movie from user's account
    @Transactional
    void deleteMovieFromUser(Long movieId, Long userId);
}
