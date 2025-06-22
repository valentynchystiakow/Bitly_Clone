package com.url.shortener.security;


// imports libraries(classes)
import com.url.shortener.security.jwt.JwtAuthenticationFilter;
import com.url.shortener.service.UserDetailsServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@AllArgsConstructor
// creates WebSecurityConfig class
public class WebSecurityConfig {
    // creates instance of UserDetailsServiceImpl
    private UserDetailsServiceImpl userDetailsServiceImpl;

    //marks method as Spring Bean
    @Bean
    // creates method that returns JwtAuthenticationFilter
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter();
    }


    //marks method as Spring Bean
    @Bean
    // creates method that creates password encoder
    public PasswordEncoder passwordEncoder () {
        return new BCryptPasswordEncoder() ;
    }

    //marks method as Spring Bean
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    // marks method as Spring Bean
    @Bean
    // creates method that creates dao authentication provider
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        // sets user details service
        authProvider.setUserDetailsService(userDetailsServiceImpl);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }


    // marks method as Spring Bean
    @Bean
    // creates method that returns SecurityFilterChain
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // disables csrf, csrf - cross site request forgery, and authorize http requests with auth method
        http.csrf(AbstractHttpConfigurer::disable).authorizeHttpRequests(auth -> auth
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/urls/**").authenticated()
                .requestMatchers("/{shortUrl}").permitAll().anyRequest().authenticated());
        // sets authentication provider
        http.authenticationProvider(authenticationProvider());
        // ads filter before UsernamePasswordAuthenticationFilter
        http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}
