package katya.movieApp.dtos;

import katya.movieApp.entities.Movie;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MovieDto {
    private Long id;
    private String title;
    private int duration;
    private String director;
    private String genre;
    private String maturityRating;
    private String description;
    private String image;

    private BigDecimal averageRating;
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
        if (movie.getDirector() != null) {
            this.director = movie.getDirector();
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

    public MovieDto(Long id, String title, String image, BigDecimal averageRating) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.averageRating = averageRating;
    }
}