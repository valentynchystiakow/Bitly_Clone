package com.url.shortener.models;

// imports libraries(classes)
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;


@Entity
@Data
@Table()
// creates UrlMapping model class
public class UrlMapping {
    // marks id as primary key with IDENTITY strategy type
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String originalUrl;
    private String shortUrl;
    private int clickCount = 0;
    private LocalDateTime createdDate;

    // creates relationship between UrlMapping and User entities
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // creates relationship between UrlMapping and ClickEvent entities
    @OneToMany(mappedBy = "urlMapping")
    private List<ClickEvent> clickEvents;
}
