package com.url.shortener.dtos;

// imports classes(libraries)
import lombok.Data;
import java.util.Set;


// marks class as Lombok data
@Data
// creates RegisterRequest class
public class RegisterRequest {
    private String username;
    private String email;
    private Set<String> role;
    private String password;
}
