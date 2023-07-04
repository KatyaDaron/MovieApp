package katya.movieApp.services;

import katya.movieApp.dtos.MovieDto;
import katya.movieApp.entities.Movie;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface MovieService {
    //Getting all movies from db
    List<MovieDto> getAllMovies();

    //Adding a movie to db
    @Transactional
    void addMovie(MovieDto movieDto);

    //Adding a movie to user's account
    @Transactional
    void addMovieToUser(Long userId, Long movieId);

    //Deleting a movie from user's account
    @Transactional
    void deleteMovieFromUser(Long userId, Long movieId);

    //Displaying detailed information about a specific movie
    MovieDto getMovieById(Long movieId);

    //Finding a movie by any character or word in the title
    List<MovieDto> findMoviesByTitle(String searchQuery);

    //Calculating the average rating for each movie
    List<MovieDto> getMoviesWithAverageRating();
}