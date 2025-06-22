package com.url.shortener.service;

// imports libraries(classes)
import com.url.shortener.models.User;
import com.url.shortener.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

// marks class as Spring Service
@Service
// creates UserDetailsServiceImpl class that implements UserDetailsService interface
public class UserDetailsServiceImpl implements UserDetailsService {


    @Autowired
    // creates UserRepository object
    UserRepository userRepository;

    // overrides loadUserByUsername interface method
    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // finds user by username from database
        User user = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User with" + username + " not found"));
        // builds UserDetailsImpl object that Spring Security uses
        return UserDetailsImpl.build(user);
    }
}
