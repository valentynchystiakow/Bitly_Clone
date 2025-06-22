package com.url.shortener.controller;

// imports libraries(classes)
import com.url.shortener.models.UrlMapping;
import com.url.shortener.service.UrlMappingService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;


// marks class as Spring Controller
@RestController
@AllArgsConstructor
// creates RedirectController class
public class RedirectController {

    // creates instance of UrlMappingService
    private UrlMappingService urlMappingService;

    // marks class with get mapping annotation to create get requests for current endpoint
    @GetMapping("/{shortUrl}")
    // creates method that creates redirect to original url
    public ResponseEntity<Void> redirect(@PathVariable String shortUrl) {
        UrlMapping urlMapping = urlMappingService.getOriginalUrl(shortUrl);
        // validates urlMapping
        if (urlMapping != null) {
            // creates instance of HttpHeaders
            HttpHeaders httpHeaders = new HttpHeaders();
            // adds Location header with original url to HttpHeaders
            httpHeaders.add("Location",urlMapping.getOriginalUrl());
            return ResponseEntity.status(302).headers(httpHeaders).build();
        } else { // in other case returns 404
            return ResponseEntity.notFound().build();}

    }
}
