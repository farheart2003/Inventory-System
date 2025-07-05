package com.example.farhat.repository;

import com.example.farhat.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Kutafuta user kwa username
    Optional<User> findByUsername(String username);

    // Kutafuta user kwa email
    Optional<User> findByEmail(String email);

    // Ku-check kama email ipo tayari
    boolean existsByEmail(String email);

    // Ku-check kama username ipo tayari
    boolean existsByUsername(String username);
    //  login
    // User findByUsername(String username);
     // Hii ndio ilikuwa haipo
    

}
