package katya.movieApp.dtos;

import katya.movieApp.entities.Rating;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RatingDto {
    private Long id;
    private BigDecimal ratingValue;
    private String comment;
    private UserDto userDto;
    private MovieDto movieDto;

    public RatingDto(Rating rating) {
        if (rating.getId() != null) {
            this.id = rating.getId();
        }
        if (rating.getRatingValue() != null) {
            this.ratingValue = rating.getRatingValue();
        }
        if (rating.getComment() != null) {
            this.comment = rating.getComment();
        }
    }
}