package katya.movieApp.services;

import jakarta.transaction.Transactional;
import katya.movieApp.dtos.UserDto;

import java.util.List;

public interface UserService {
    @Transactional
    List<String> addUser(UserDto userDto);

    List<String> userLogin(UserDto userDto);
}