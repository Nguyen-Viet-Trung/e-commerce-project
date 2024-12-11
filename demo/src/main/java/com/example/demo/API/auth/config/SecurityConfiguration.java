package com.example.demo.API.auth.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.example.demo.API.auth.Service.AuthFilterService;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfiguration {
    private final AuthFilterService authFilterService;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        http.csrf(AbstractHttpConfigurer::disable)
        .authorizeHttpRequests(auth -> auth
        .requestMatchers("/api/users/login","api/users","api/users/logout","api/users/refresh",
        "api/admin/**","/headphoneInfo/**","admin/**","/comments/**","forgotPassword/**",
        "orderdetails/**","/updateQuantity","/productAvailable/**","/updateSold","products/**",
        "/view/**","productInfo/**","/orders/**","/wishlist/**","/payment/**","/order/**",
        "/","/successful","/cancel","/create-payment-link","/api/users/graph_users","api/users/delete/**").permitAll()
        .requestMatchers("/api/users/profile/**","/api/users/update/**").authenticated())
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authenticationProvider(authenticationProvider).addFilterBefore(authFilterService, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}
