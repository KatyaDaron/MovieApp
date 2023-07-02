package katya.movieApp.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
}
