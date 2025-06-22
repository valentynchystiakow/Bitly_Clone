package com.url.shortener.service;

// imports classes(libraries)
import com.url.shortener.dtos.ClickEventDTO;
import com.url.shortener.dtos.UrlMappingDTO;
import com.url.shortener.models.ClickEvent;
import com.url.shortener.models.UrlMapping;
import com.url.shortener.models.User;
import com.url.shortener.repository.ClickEventRepository;
import com.url.shortener.repository.UrlMappingRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.stream.Collectors;

// marks class with Spring Java Service annotation
@Service
@AllArgsConstructor
// creates UrlMapping Service class
public class UrlMappingService {

    // creates instance of UrlMappingRepository
    private final UrlMappingRepository urlMappingRepository;

    // creates instance of ClickEventRepository
    private final ClickEventRepository clickEventRepository;

    // creates method that creates short url
    public UrlMappingDTO createShortUrl(String originalUrl, User user) {
        String shortUrl = generateShortUrl();
        // creates instance of UrlMappingDTO
        UrlMapping urlMapping = new UrlMapping();
        // sets UrlMappingDTO properties
        urlMapping.setOriginalUrl(originalUrl);
        urlMapping.setShortUrl(shortUrl);
        urlMapping.setUser(user);
        urlMapping.setCreatedDate(LocalDateTime.now());
        UrlMapping savedUrlMapping = urlMappingRepository.save(urlMapping);
        return convertToDto(savedUrlMapping);
    }

    // creates method that converts to DTO
    public UrlMappingDTO convertToDto(UrlMapping urlMapping) {
        // creates instance of UrlMappingDTO
        UrlMappingDTO urlMappingDTO = new UrlMappingDTO();
        // sets UrlMappingDTO properties
        urlMappingDTO.setId(urlMapping.getId());
        urlMappingDTO.setOriginalUrl(urlMapping.getOriginalUrl());
        urlMappingDTO.setShortUrl(urlMapping.getShortUrl());
        urlMappingDTO.setClickCount(urlMapping.getClickCount());
        urlMappingDTO.setCreatedDate(urlMapping.getCreatedDate());
        urlMappingDTO.setUsername(urlMapping.getUser().getUsername());
        return urlMappingDTO;
    }

    // creates method that generates short url
    private String generateShortUrl() {
        // creates list of characters
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        // creates instance of Random class
        Random random = new Random();
        // creates instance of StringBuilder class for short url
        StringBuilder shortUrl = new StringBuilder(8);
        for (int i = 0; i < 8; i++) {
            // adds random character to short url
            shortUrl.append(characters.charAt(random.nextInt(characters.length())));
        }
        return shortUrl.toString();
    }

    // creates method that gets all user urls
    public List<UrlMappingDTO> getUrlsByUser(User user) {
        // uses findByUser method to find url mappings by user and maps them to list of UrlMappingDTO objects
        return urlMappingRepository.findByUser(user).stream().map(this::convertToDto).toList();
    }

    // creates method that gets Click Events by certain date
    public List<ClickEventDTO> getClickEventsByDate(String shortUrl, LocalDateTime start, LocalDateTime end) {
        // finds url mapping by short url
        UrlMapping urlMapping = urlMappingRepository.findByShortUrl(shortUrl);
        // validates if url mapping is not null
        if (urlMapping != null) {
            return clickEventRepository.findByUrlMappingAndClickDateBetween(urlMapping, start, end).stream()
                    .collect(Collectors.groupingBy(click -> click.getClickDate().toLocalDate(), Collectors.counting()))
                    .entrySet().stream()
                    // maps entry set to list of ClickEventDTO objects
                    .map(entry -> {
                        ClickEventDTO clickEventDTO = new ClickEventDTO();
                        clickEventDTO.setClickDate(entry.getKey());
                        clickEventDTO.setCount(entry.getValue());
                        return clickEventDTO;
                    })
                    .collect(Collectors.toList());
        }
        return null;
    }


    // creates method that gets total clicks by user and date
    public Map<LocalDate, Long> getTotalClicksByUserAndDate(User user, LocalDate start, LocalDate end) {
        // finds list of all url mapping by particular user
        List<UrlMapping> urlMappings = urlMappingRepository.findByUser(user);
        // finds list of click events by url mappings and certain date
        List<ClickEvent> clickEvents = clickEventRepository.findByUrlMappingInAndClickDateBetween(urlMappings, start.atStartOfDay(), end.plusDays(1).atStartOfDay());
        return clickEvents.stream()
                .collect(Collectors.groupingBy(click -> click.getClickDate().toLocalDate(), Collectors.counting()));
    }

    // creates method that gets OriginalUrl
    public UrlMapping getOriginalUrl(String shortUrl) {
        UrlMapping urlMapping = urlMappingRepository.findByShortUrl(shortUrl);
        if (urlMapping != null) {
            // increments click count by 1 after redirect
            urlMapping.setClickCount(urlMapping.getClickCount() + 1);
            // saves updated url mapping to database
            urlMappingRepository.save(urlMapping);

            // records click event
            ClickEvent clickEvent = new ClickEvent();
            clickEvent.setClickDate(LocalDateTime.now());
            clickEvent.setUrlMapping(urlMapping);
            // saves updated click event to database
            clickEventRepository.save(clickEvent);
        }
        return urlMapping;
    }
}
