package com.url.shortener.service;

// imports libraries(classes)
import com.url.shortener.models.User;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serial;
import java.util.Collection;
import java.util.Collections;

// marks class as Lombok class
@Data
@NoArgsConstructor
// creates UserDetailsImpl class that implements UserDetails interface
public class UserDetailsImpl implements UserDetails {
    // creates serial version UID
    @Serial
    private static final long serialVersionUID = 1L;


    // class fields
    private Long id;
    private String username;
    private String email;

    private String password;

    private Collection<? extends GrantedAuthority> authorities;

    // creates class constructor
    public UserDetailsImpl(String username, Long id, String email, String password, Collection<? extends GrantedAuthority> authorities) {
        this.username = username;
        this.id = id;
        this.email = email;
        this.password = password;
        this.authorities = authorities;
    }

    // creates method that builds UserDetailsImpl object
    public static UserDetailsImpl build(User user) {
        // creates simple granted authority object
        GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(user.getRole());
        // returns new UserDetailsImpl object
        return new UserDetailsImpl(
                user.getUsername(),
                user.getId(),
                user.getEmail(),
                user.getPassword(),
                Collections.singletonList(grantedAuthority)
        );

    }

    //  overrides UserDetails method that returns collection of granted authorities
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    // overrides UserDetails method that returns password
    @Override
    public String getPassword() {
        return password;
    }

    // overrides UserDetails method that returns username
    @Override
    public String getUsername() {
        return username;
    }
}
