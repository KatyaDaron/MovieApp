package katya.movieApp.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import katya.movieApp.dtos.MovieDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "Movies")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String title;

    @Column
    private int duration;

    @Column
    private String director;

    @Column
    private String genre;

    @Column
    private String maturityRating;

    @Column(columnDefinition = "text")
    private String description;

    @Column(columnDefinition = "text")
    private String image;

    @OneToMany(mappedBy = "movie", fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JsonManagedReference
    private Set<Rating> ratings = new HashSet<>();

    public Movie(MovieDto movieDto) {
        if (movieDto.getTitle() != null) {
            this.title = movieDto.getTitle();
        }
        if (movieDto.getDuration() != 0) {
            this.duration = movieDto.getDuration();
        }
        if (movieDto.getDirector() != null) {
            this.director = movieDto.getDirector();
        }
        if (movieDto.getGenre() != null) {
            this.genre = movieDto.getGenre();
        }
        if (movieDto.getMaturityRating() != null) {
            this.maturityRating = movieDto.getMaturityRating();
        }
        if (movieDto.getDescription() != null) {
            this.description = movieDto.getDescription();
        }
        if (movieDto.getImage() != null) {
            this.image = movieDto.getImage();
        }
    }
}