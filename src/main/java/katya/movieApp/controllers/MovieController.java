package katya.movieApp.controllers;

import katya.movieApp.dtos.MovieDto;
import katya.movieApp.services.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/movies")
public class MovieController {
    @Autowired
    private MovieService movieService;

    @GetMapping("/")
    public List<MovieDto> getAllMovies() {
        return movieService.getAllMovies();
    }

    @PostMapping("/")
    public void addMovie(@RequestBody MovieDto movieDto) {
        movieService.addMovie(movieDto);
    }

    @PostMapping("/user/{userId}")
    public void addMovieToUser(@PathVariable Long userId, @RequestParam Long movieId) {
        movieService.addMovieToUser(userId, movieId);
    }

    @DeleteMapping("/user/{userId}")
    public void deleteMovieFromUser(@PathVariable Long userId, @RequestParam Long movieId) {
        movieService.deleteMovieFromUser(userId, movieId);
    }

    @GetMapping("/{movieId}")
    public MovieDto getMovieById(@PathVariable Long movieId) {
        return movieService.getMovieById(movieId);
    }

    @GetMapping("/search")
    public List<MovieDto> findMoviesByTitle(@RequestParam("query") String searchQuery) {
        return movieService.findMoviesByTitle(searchQuery);
    }

    @GetMapping("/{userId}/movies")
    public List<MovieDto> getAddedMoviesByUser(@PathVariable Long userId) {
        return movieService.getAddedMoviesByUser(userId);
    }
}