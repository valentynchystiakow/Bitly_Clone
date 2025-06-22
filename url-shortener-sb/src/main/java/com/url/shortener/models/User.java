package com.url.shortener.models;


// imports libraries(classes)
import jakarta.persistence.*;
import lombok.Data;


// marks class as entity for JPA ORM and Lombok
@Entity
@Data
@Table(name = "users")
// creates User model class
public class User {
    // model fields
    // marks id as primary key with auto generation type
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    private String username;
    private String password;
    private String role = "ROLE_USER";
}
