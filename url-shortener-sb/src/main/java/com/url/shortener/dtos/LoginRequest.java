package com.url.shortener.dtos;


// imports libraries(classes)
import lombok.Data;

@Data
// creates LoginRequest model
public class LoginRequest {
    // class fields
    private String username;
    private String password;
}
