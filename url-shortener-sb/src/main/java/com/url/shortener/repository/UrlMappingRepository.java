package com.url.shortener.repository;

// imports libraries(classes
import com.url.shortener.models.UrlMapping;
import com.url.shortener.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

// marks class as Spring Repository annotation
@Repository
// creates UrlMappingRepository interface that extends JpaRepository
public interface UrlMappingRepository extends JpaRepository<UrlMapping,Long> {
    // creates method that finds url mapping by short url
    UrlMapping findByShortUrl(String shortUrl);
    // creates method that finds url mapping by user
    List<UrlMapping> findByUser(User user);
}
