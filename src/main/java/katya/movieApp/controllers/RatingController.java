package katya.movieApp.controllers;

import katya.movieApp.dtos.RatingDto;
import katya.movieApp.services.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("api/v1/ratings")
public class RatingController {
    @Autowired
    private RatingService ratingService;

    @PostMapping("/user/{movieId}")
    public void addRatingToMovie(@PathVariable Long movieId, @RequestParam Long userId, @RequestParam BigDecimal ratingValue, @RequestParam(required = false) String comment) {
        ratingService.addRatingToMovie(movieId, userId, ratingValue, comment);
    }

    @DeleteMapping("/user/comment/{ratingId}")
    public void deleteComment(@PathVariable Long ratingId, @RequestParam Long userId) {
        ratingService.deleteComment(ratingId, userId);
    }

    @DeleteMapping("/user/rating/{ratingId}")
    public void deleteRating(@PathVariable Long ratingId, @RequestParam Long userId) {
        ratingService.deleteRating(ratingId, userId);
    }

    @PutMapping("/user/comment/edit/{ratingId}")
    public void editComment(@PathVariable Long ratingId, @RequestParam Long userId, @RequestParam String newComment) {
        ratingService.editComment(ratingId, userId, newComment);
    }

    @PutMapping("/user/rating/edit/{ratingId}")
    public void editRating(@PathVariable Long ratingId, @RequestParam Long userId, @RequestParam BigDecimal newRatingValue) {
        ratingService.editRating(ratingId, userId, newRatingValue);
    }

    @GetMapping("/user/{userId}")
    public List<RatingDto> getRatingsAndCommentsByUser(@PathVariable Long userId) {
        return ratingService.getRatingsAndCommentsByUser(userId);
    }
}