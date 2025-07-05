package com.example.farhat.service;

import com.example.farhat.model.User;
import com.example.farhat.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor // Lombok: ina-inject final dependencies automatically
@Transactional
public class UserService {

    private final UserRepository userRepository;

    // Kusajili user mpya
    public User createUser(User user) {
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        // Unaweza kuongeza password hashing hapa ikiwa unatumia security
        return userRepository.save(user);
    }

    // Kupata user wote
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Kupata user mmoja kwa id
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    // Kufuta user
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found");
        }
        userRepository.deleteById(id);
    }

    // Kuhariri user
    public User updateUser(Long id, User updatedUser) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setUsername(updatedUser.getUsername());
                    user.setEmail(updatedUser.getEmail());
                    user.setPassword(updatedUser.getPassword());
                    user.setRole(updatedUser.getRole());
                    return userRepository.save(user);
                }).orElseThrow(() -> new RuntimeException("User not found"));
    }

            // login user
            public Optional<User> login(String username, String password) {
            Optional<User> userOpt = userRepository.findByUsername(username);
            return userOpt.filter(user -> user.getPassword().equals(password));
        }


   public User findByUsername(String username) {
    return userRepository.findByUsername(username).orElse(null);
}
}
