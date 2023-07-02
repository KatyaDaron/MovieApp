package katya.movieApp.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import katya.movieApp.dtos.RatingDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

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
    private BigDecimal ratingValue;

    @Column(columnDefinition = "text")
    private String comment;

    @ManyToOne
    @JsonBackReference
    private User user;

    @ManyToOne
    @JsonBackReference
    private Movie movie;

    public Rating(RatingDto ratingDto) {
        if (ratingDto.getRatingValue() != null) {
            this.ratingValue = ratingDto.getRatingValue();
        }
        if (ratingDto.getComment() != null) {
            this.comment = ratingDto.getComment();
        }
    }
}