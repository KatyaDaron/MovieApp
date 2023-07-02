package katya.movieApp.dtos;

import katya.movieApp.entities.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto implements Serializable {
    private Long id;
    private String name;
    private String email;
    private String password;
    private Set<RatingDto> ratingDtoSet = new HashSet<>();

    public UserDto(User user) {
        if (user.getId() != null) {
            this.id = user.getId();
        }
        if (user.getName() != null) {
            this.name = user.getName();
        }
        if (user.getEmail() != null) {
            this.email = user.getEmail();
        }
        if (user.getPassword() != null) {
            this.password = user.getPassword();
        }
    }
}