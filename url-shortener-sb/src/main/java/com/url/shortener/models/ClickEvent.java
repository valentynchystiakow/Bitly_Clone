package com.url.shortener.models;


// imports libraries(classes)
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;


// marks class as entity for JPA ORM and Lombok
@Entity
@Data
// creates ClickEvent model class
public class ClickEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDateTime clickDate;

    // creates relationship between ClickEvent and UrlMapping
    @ManyToOne
    @JoinColumn(name = "url_mapping_id")
    private UrlMapping urlMapping;

}
