package katya.movieApp.services;

import jakarta.transaction.Transactional;
import katya.movieApp.dtos.UserDto;
import katya.movieApp.entities.User;
import katya.movieApp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public List<String> addUser(UserDto userDto) {
        List<String> response = new ArrayList<>();
        User user = new User(userDto);
        userRepository.saveAndFlush(user);
        response.add("http://localhost:8080/login.html");
        return response;
    }

    @Override
    public List<String> userLogin(UserDto userDto) {
        List<String> response = new ArrayList<>();
        Optional<User> userOptional = userRepository.findByEmail(userDto.getEmail());
        if (userOptional.isPresent()) {
            if (passwordEncoder.matches(userDto.getPassword(), userOptional.get().getPassword())) {
                response.add("http://localhost:8080/profile.html");
                response.add(String.valueOf(userOptional.get().getId()));
                response.add(userOptional.get().getName());
            } else {
                response.add("Username or password incorrect");
            }
        } else {
            response.add("Username or password incorrect");
        }
        return response;
    }
}