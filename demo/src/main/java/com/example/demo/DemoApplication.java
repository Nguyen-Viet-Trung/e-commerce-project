package com.example.demo;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


import vn.payos.*;

@SpringBootApplication
@Configuration
public class DemoApplication implements WebMvcConfigurer{
	@Value("${PAYOS_CLIENT_ID}")
	private String clientId;
	@Value("${PAYOS_API_KEY}")
	private String apiKey;
	@Value("${PAYOS_CHECKSUM_KEY}")
	private String checksumKey;
	@Override
	public void addCorsMappings(@NonNull CorsRegistry registry) {
		registry.addMapping("/**")
				.allowedOriginPatterns("*")
				.allowedMethods("*")
				.allowedHeaders("*")
				.exposedHeaders("*")
				.allowCredentials(true)
				.maxAge(3600);
	}
	@Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()          // Disable CSRF if not needed
            .authorizeRequests()
            .anyRequest().permitAll(); // Allow all requests without authentication

        return http.build();
	}
	protected void configure(HttpSecurity http) throws Exception {
    	http
        .authorizeRequests()
        .requestMatchers("*").permitAll() 
        .anyRequest().authenticated();
}

	@Bean
	public PayOS payOS() {
		return new PayOS(clientId, apiKey, checksumKey);
	}
	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}
}
