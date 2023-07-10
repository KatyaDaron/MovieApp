package katya.movieApp.dtos;

import katya.movieApp.entities.Rating;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RatingDto {
    private Long id;
    private int ratingValue;
    private String comment;
    private UserDto userDto;
    private MovieDto movieDto;

    public RatingDto(Rating rating, UserDto userDto, MovieDto movieDto) {
        if (rating.getId() != null) {
            this.id = rating.getId();
        }
        if (rating.getRatingValue() != 0) {
            this.ratingValue = rating.getRatingValue();
        }
        if (rating.getComment() != null) {
            this.comment = rating.getComment();
        }
        this.userDto = userDto;
        this.movieDto = movieDto;
    }

    public RatingDto(Rating rating) {
        if (rating.getId() != null) {
            this.id = rating.getId();
        }
        if (rating.getRatingValue() != 0) {
            this.ratingValue = rating.getRatingValue();
        }
        if (rating.getComment() != null) {
            this.comment = rating.getComment();
        }
    }
}