package com.url.shortener.controller;

// imports libraries(classes)
import com.url.shortener.dtos.LoginRequest;
import com.url.shortener.dtos.RegisterRequest;
import com.url.shortener.models.User;
import com.url.shortener.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
// creates AuthController class
public class AuthController {
    // creates instance of User Service;
    private UserService userService;

    // creates method that logins User
    @PostMapping("/public/login")
    // creates method that authenticates User
    public ResponseEntity<?> loginUser (@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(userService.authenticateUser(loginRequest));
    }

    // marks method with Post Mapping annotation in order to make post request to endpoint to register user
    @PostMapping("/public/register")
    // creates method that registers User
    public ResponseEntity<?> registerUser (@RequestBody RegisterRequest registerRequest)
   {
        // creates instance of User
        User user  = new User();
        // sets User settings
        user.setUsername(registerRequest.getUsername());
        user.setPassword(registerRequest.getPassword());
        user.setEmail(registerRequest.getEmail());
        user.setRole("ROLE_USER");
        // registers user in user Service
        userService.registerUser(user);
        // returns Response Entity with success type
        return ResponseEntity.ok("User registered successfully");
    }

}
