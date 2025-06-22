package com.url.shortener.controller;

// imports libraries(classes)
import com.url.shortener.dtos.ClickEventDTO;
import com.url.shortener.dtos.UrlMappingDTO;
import com.url.shortener.models.User;
import com.url.shortener.service.UrlMappingService;
import com.url.shortener.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;


@RestController
// marks class with RequestMapping annotation in order to make requests to certain endpoints
@RequestMapping("/api/urls")
@AllArgsConstructor
// creates UrlMappingController class
public class UrlMappingController {
    // creates instance of urlMapping Service;
    private UrlMappingService urlMappingService;
    private UserService userService;

    // url structure:
    // {"originalUrl" : "https://example.com"}
    // marks method with post mapping annotation in order to make post requests for current endpoint
    @PostMapping("/shorten")
    @PreAuthorize("hasRole('USER')")
    // creates method that creates short url
    public ResponseEntity<UrlMappingDTO> createShortUrl (@RequestBody Map<String,String> request, Principal principal) {
        // gets original url from request
        String originalUrl = request.get("originalUrl");
        // finds user from Service
        User user =  userService.findByUsername(principal.getName());
        // calls method that creates short url
        UrlMappingDTO urlMappingDTO  = urlMappingService.createShortUrl(originalUrl, user);
        return ResponseEntity.ok(urlMappingDTO);

    }

    // creates method that gets all user urls
    @GetMapping("/myurls")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<UrlMappingDTO>> getUserUrls(Principal principal){
        // finds user by username from user service
        User user = userService.findByUsername(principal.getName());
        // calls method that gets all user urls from url mapping service
        List<UrlMappingDTO> urls = urlMappingService.getUrlsByUser(user);
        return ResponseEntity.ok(urls);
    }


    // creates method that gets analytics of urls
    @GetMapping("/analytics/{shortUrl}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<ClickEventDTO>> getUrlAnalytics(@PathVariable String shortUrl, @RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate) {
        // creates instance of datetime formatter
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
        LocalDateTime start = LocalDateTime.parse(startDate, formatter);
        LocalDateTime end = LocalDateTime.parse(endDate, formatter);
        // calls method that gets click events by certain date from url mapping service
        List<ClickEventDTO> clickEventDTOS = urlMappingService.getClickEventsByDate(shortUrl, start, end);
        return ResponseEntity.ok(clickEventDTOS);
        }

    // creates method that gets total clicks by user from database
    @GetMapping("/totalClicks")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Map<LocalDate, Long>> getTotalClicksByDate(Principal principal,
                                                                     @RequestParam("startDate") String startDate,
                                                                     @RequestParam("endDate") String endDate){
        // creates instance of datetime formatter
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE;
        // gets user from user service by username
        User user = userService.findByUsername(principal.getName());
        LocalDate start = LocalDate.parse(startDate, formatter);
        LocalDate end = LocalDate.parse(endDate, formatter);
        // creates map of total clicks by user and date from url mapping service
        Map<LocalDate, Long> totalClicks = urlMappingService.getTotalClicksByUserAndDate(user, start, end);
        return ResponseEntity.ok(totalClicks);
    }

}
