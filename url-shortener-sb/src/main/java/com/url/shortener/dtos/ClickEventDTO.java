package com.url.shortener.dtos;

// imports libraries(classes)
import lombok.Data;
import java.time.LocalDate;

// marks class with Lombok Data annotation
@Data
// creates ClickEventDTO model class
public class ClickEventDTO {
    // class fields
    private LocalDate clickDate;
    private Long count;

}
