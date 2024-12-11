package com.example.demo;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;

import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import io.github.cdimascio.dotenv.Dotenv;
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
// 	@Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//         http
//             .csrf().disable()          // Disable CSRF if not needed
//             .authorizeRequests()
//             .anyRequest().permitAll(); // Allow all requests without authentication

//         return http.build();
// 	}
// 	protected void configure(HttpSecurity http) throws Exception {
//     	http
//         .authorizeRequests()
//         .requestMatchers("*").permitAll() 
//         .anyRequest().authenticated();
// }

	@Bean
	public PayOS payOS() {
		return new PayOS(clientId, apiKey, checksumKey);
	}
	public static void main(String[] args) {
		Dotenv dotenv = Dotenv.configure().load();
		System.setProperty("PAYOS_CLIENT_ID", dotenv.get("PAYOS_CLIENT_ID"));
		System.setProperty("PAYOS_API_KEY", dotenv.get("PAYOS_API_KEY"));
		System.setProperty("PAYOS_CHECKSUM_KEY", dotenv.get("PAYOS_CHECKSUM_KEY"));
		System.setProperty("DATABASE_URL", dotenv.get("DATABASE_URL"));
        System.setProperty("DATABASE_USERNAME", dotenv.get("DATABASE_USERNAME"));
        System.setProperty("DATABASE_PASSWORD", dotenv.get("DATABASE_PASSWORD"));
		System.setProperty("MAIL_HOST", dotenv.get("MAIL_HOST"));
		System.setProperty("MAIL_PORT", dotenv.get("MAIL_PORT"));
		System.setProperty("MAIL_USERNAME", dotenv.get("MAIL_USERNAME"));
		System.setProperty("MAIL_PASSWORD", dotenv.get("MAIL_PASSWORD"));

		SpringApplication.run(DemoApplication.class, args);
	}
}
