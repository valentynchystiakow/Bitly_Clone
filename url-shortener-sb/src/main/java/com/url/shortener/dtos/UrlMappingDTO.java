package com.url.shortener.dtos;

// imports libraries(classes)
import lombok.Data;
import java.time.LocalDateTime;

// marks class with Lombok Data annotation
@Data
// creates URLMappingDTO model class
public class UrlMappingDTO {
    // class fields
    private Long id;
    private String originalUrl;
    private String shortUrl;
    private int clickCount;
    private LocalDateTime createdDate;
    private String username;

}
