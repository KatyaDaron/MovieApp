package katya.movieApp.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import katya.movieApp.dtos.RatingDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Ratings")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Rating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "rating_value", precision = 2, scale = 1)
    private int ratingValue;

    @Column(columnDefinition = "text")
    private String comment;

    @ManyToOne
    @JsonBackReference
    private User user;

    @ManyToOne
    @JsonBackReference
    private Movie movie;

    public Rating(RatingDto ratingDto, User user, Movie movie) {
        if (ratingDto.getRatingValue() != 0) {
            this.ratingValue = ratingDto.getRatingValue();
        }
        if (ratingDto.getComment() != null) {
            this.comment = ratingDto.getComment();
        }
        this.user = user;
        this.movie = movie;
    }
}