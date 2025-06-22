package com.url.shortener;

// imports libraries(classes)
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// marks class with main Spring Boot Application
@SpringBootApplication
public class UrlShortenerSbApplication {
	// creates main method that runs program
	public static void main(String[] args) {
		SpringApplication.run(UrlShortenerSbApplication.class, args);
	}

}
