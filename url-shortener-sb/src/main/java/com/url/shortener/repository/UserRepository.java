package com.url.shortener.repository;

// imports libraries(classes
import com.url.shortener.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;


// marks class as Spring Repository annotation
@Repository
// creates UserRepository class that extends JpaRepository
public interface UserRepository extends JpaRepository<User,Long> {
    // creates method that finds user by username
    Optional<User> findByUsername(String username);
}
