package com.url.shortener.security;

// imports libraries(classes)
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// marks class with Java Spring Configuration annotation
@Configuration
// creates class that implements WebMvc interface
public class WebConfig implements WebMvcConfigurer {

    // front-end url value
    @Value("${frontend.url}")
    String frontEndUrl;

    // overrides interface method that allows Cors Mapping
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(frontEndUrl)
                .allowedMethods("GET","POST","PUT","DELETE","OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}