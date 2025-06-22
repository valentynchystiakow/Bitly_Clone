package com.url.shortener.security.jwt;

// imports libraries(classes
import lombok.AllArgsConstructor;
import lombok.Data;

// marks class as Lombok class
@Data
@AllArgsConstructor
// creates JwtAuthenticationResponse class
public class JwtAuthenticationResponse {
    // class fields
    private String token;


}
