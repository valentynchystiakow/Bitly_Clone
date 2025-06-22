package com.url.shortener.repository;

// imports libraries(classes
import com.url.shortener.models.ClickEvent;
import com.url.shortener.models.UrlMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

// marks class as Spring Repository annotation
@Repository
// creates UrlMappingRepository interface that extends JpaRepository
public interface ClickEventRepository extends JpaRepository<ClickEvent,Long> {
    // creates method that finds list of click events by url mapping and certain date
    List<ClickEvent> findByUrlMappingAndClickDateBetween(UrlMapping urlMapping, LocalDateTime start, LocalDateTime end);
    // creates method that finds list of click events by url mapping in and certain date
    List<ClickEvent> findByUrlMappingInAndClickDateBetween(List<UrlMapping> urlMappings, LocalDateTime start, LocalDateTime end);

}
