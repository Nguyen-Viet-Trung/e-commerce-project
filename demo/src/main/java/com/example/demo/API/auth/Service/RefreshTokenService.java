package com.example.demo.API.auth.Service;

import java.time.Instant;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.example.demo.API.Entity.User;
import com.example.demo.API.Entity.Token.RefreshToken;
import com.example.demo.API.Repository.RefreshTokenRepository;
import com.example.demo.API.Repository.UserRepository;

@Service
public class RefreshTokenService {
    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    public RefreshTokenService(UserRepository userRepository, RefreshTokenRepository refreshTokenRepository) {
        this.userRepository = userRepository;
        this.refreshTokenRepository = refreshTokenRepository;
    }
    public RefreshToken createRefreshToken(String username){
        User user = userRepository.findByUsername(username).orElseThrow(() -> new IllegalArgumentException("User not found."));
        
        RefreshToken refreshToken = user.getRefreshToken();
        if(refreshToken == null){
            refreshToken = RefreshToken.builder().refreshToken(UUID.randomUUID().toString()).expirationTime(Instant.now().plusMillis(5*60*60*10000)).user(user).build();
            refreshTokenRepository.save(refreshToken);
        }
        return refreshToken;
    }
    public RefreshToken verifyRefreshToken(String refreshToken){
        RefreshToken token = refreshTokenRepository.findByRefreshToken(refreshToken).orElseThrow(() -> new RuntimeException("Refresh token not found!"));
        if(token.getExpirationTime().compareTo(Instant.now()) <0){
            refreshTokenRepository.delete(token);
            throw new RuntimeException("Refresh token expired!");
        }
        return token;
    }

    public void deleteToken(String refreshToken) {
        RefreshToken token = refreshTokenRepository.findByRefreshToken(refreshToken)
            .orElseThrow(() -> new IllegalArgumentException("Invalid refresh token"));
        refreshTokenRepository.delete(token);
    }
    
}
