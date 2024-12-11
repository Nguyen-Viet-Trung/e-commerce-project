package com.example.demo.API.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.API.DTO.UserDTO;
import com.example.demo.API.Entity.User;
import com.example.demo.API.Entity.Token.RefreshToken;
import com.example.demo.API.Service.UserService;
import com.example.demo.API.auth.Service.JwtService;
import com.example.demo.API.auth.Service.RefreshTokenService;
import com.example.demo.API.utils.AuthResponse;
import com.example.demo.API.utils.LogInRquest;
import com.example.demo.API.utils.RefreshTokenRequest;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final RefreshTokenService refreshTokenService;
    private final JwtService jwtService;
    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> users = userService.findAll();
        return ResponseEntity.ok(users);
    }

    @GetMapping("profile/{username}")
    public ResponseEntity<UserDTO> getUserByUsername(@PathVariable String username) {
        UserDTO user = userService.findByUsername(username);
        return user != null ? ResponseEntity.ok(user) : ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }    

    @PutMapping("update/{username}")
    public ResponseEntity<Void> updateUser(@PathVariable String username, @RequestBody UserDTO userDTO) {
        userService.UpdateUser(username, userDTO);
        return ResponseEntity.noContent().build();
    }
    @PostMapping
    public ResponseEntity<AuthResponse> createUser(@RequestBody UserDTO userDTO) {
        
        return ResponseEntity.ok(userService.save(userDTO));
    }
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LogInRquest logInRquest) {
        return ResponseEntity.ok(userService.login(logInRquest));
    }
    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestBody RefreshTokenRequest refreshTokenRequest) {
        try {
            // Xóa refresh token khỏi database
            refreshTokenService.deleteToken(refreshTokenRequest.getRefreshToken());
            return ResponseEntity.ok("Logout successful");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error during logout: " + e.getMessage());
        }
    }
    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refreshToken(@RequestBody RefreshTokenRequest refreshTokenRequest) {
        RefreshToken refreshToken = refreshTokenService.verifyRefreshToken(refreshTokenRequest.getRefreshToken());
        User user = refreshToken.getUser();

        String accessToken = jwtService.generateToken(user);
        return ResponseEntity.ok(AuthResponse.builder()
            .accessToken(accessToken)
            .refreshToken(refreshToken.getRefreshToken())
            .build());
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") int id ) {
        try {
            userService.delete(id);
            return ResponseEntity.ok("Delete successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error delete user: " + e.getMessage());
        }
    }
    @GetMapping("/graph_users")
    @ResponseBody
    public Map<String, Object> getGraphUser(){
        return userService.getAllUser();
    }
}

