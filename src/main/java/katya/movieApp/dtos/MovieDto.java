package katya.movieApp.dtos;

import katya.movieApp.entities.Movie;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MovieDto {
    private Long id;
    private String title;
    private int duration;
    private String genre;
    private String maturityRating;
    private String description;
    private String image;
    private Set<RatingDto> ratingDtoSet = new HashSet<>();

    public MovieDto(Movie movie) {
        if (movie.getId() != null) {
            this.id = movie.getId();
        }
        if (movie.getTitle() != null) {
            this.title = movie.getTitle();
        }
        if (movie.getDuration() != 0) {
            this.duration = movie.getDuration();
        }
        if (movie.getGenre() != null) {
            this.genre = movie.getGenre();
        }
        if (movie.getMaturityRating() != null) {
            this.maturityRating = movie.getMaturityRating();
        }
        if (movie.getDescription() != null) {
            this.description = movie.getDescription();
        }
        if (movie.getImage() != null) {
            this.image = movie.getImage();
        }
    }
}