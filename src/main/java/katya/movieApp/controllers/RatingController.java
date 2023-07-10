package katya.movieApp.controllers;

import katya.movieApp.dtos.RatingDto;
import katya.movieApp.services.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/feedbacks")
public class RatingController {
    @Autowired
    private RatingService ratingService;

    @PostMapping("/movie/{movieId}")
    public void addFeedback(@PathVariable Long movieId, @RequestParam Long userId, @RequestBody RatingDto ratingDto) {
        ratingService.addFeedback(movieId, userId, ratingDto);
    }

    @GetMapping("/movie/{movieId}")
    public List<RatingDto> getAllFeedbacks(@PathVariable Long movieId) {
        return ratingService.getAllFeedbacks(movieId);
    }

    @DeleteMapping("/{ratingId}")
    public void deleteFeedback(@PathVariable Long ratingId, @RequestParam Long userId) {
        ratingService.deleteFeedback(ratingId, userId);
    }

    @PutMapping("/{ratingId}")
    public void editFeedback(@PathVariable Long ratingId, @RequestParam Long userId, @RequestBody RatingDto newFeedback) {
        ratingService.editFeedback(ratingId, userId, newFeedback);
    }

//    @PutMapping("/user/rating/edit/{ratingId}")
//    public void editRating(@PathVariable Long ratingId, @RequestParam Long userId, @RequestParam BigDecimal newRatingValue) {
//        ratingService.editRating(ratingId, userId, newRatingValue);
//    }
}