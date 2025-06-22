package com.url.shortener.service;

// imports libraries(classes)
import com.url.shortener.dtos.LoginRequest;
import com.url.shortener.models.User;
import com.url.shortener.repository.UserRepository;
import com.url.shortener.security.jwt.JwtAuthenticationResponse;
import com.url.shortener.security.jwt.JwtUtils;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


// marks class as Java Spring Service annotation
@Service
@AllArgsConstructor
// creates UserService class
public class UserService {
    // class fields
    private PasswordEncoder passwordEncoder;
    private UserRepository userRepository;
    private AuthenticationManager authenticationManager;
    private JwtUtils jwtUtils;

    // creates method that registers User
    public User registerUser(User user) {
        // sets user's password
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    // creates method that authenticates User
    public JwtAuthenticationResponse authenticateUser(LoginRequest loginRequest){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),
                        loginRequest.getPassword()));
        // sets authentication in Security Context Holder
        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        // generatesToken
        String jwt = jwtUtils.generateToken(userDetails);
        return new JwtAuthenticationResponse(jwt);
    }

    // creates method that finds user by username in userRepository or throws exception if user is not found
    public User findByUsername(String name) {
        return userRepository.findByUsername(name).orElseThrow(() -> new RuntimeException("User not found with username: " + name));
    }
}
