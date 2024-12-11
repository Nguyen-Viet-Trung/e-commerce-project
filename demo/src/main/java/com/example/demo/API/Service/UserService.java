package com.example.demo.API.Service;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import com.example.demo.API.DTO.UserDTO;
import com.example.demo.API.Entity.User;
import com.example.demo.API.Mapper.UserMapper;
import com.example.demo.API.Repository.UserRepository;
import com.example.demo.API.auth.Service.JwtService;
import com.example.demo.API.auth.Service.RefreshTokenService;
import com.example.demo.API.utils.AuthResponse;
import com.example.demo.API.utils.LogInRquest;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;
    private final AuthenticationManager authenticationManager;
    public List<UserDTO> findAll(){
        List<User> users = userRepository.findAll();
        return userMapper.toDto(users);
    }
    public UserDTO findByUsername(String username) { 
        List<User> users = userRepository.findAll();
        List<UserDTO> userDTO = userMapper.toDto(users);
        return userDTO.stream()
                      .filter(user -> user.getUsername().equals(username))
                      .findFirst()
                      .orElse(null);  
    }
    public AuthResponse login(LogInRquest logInRquest){
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(logInRquest.getUsername(), logInRquest.getPassword())
        );
        var user = userRepository.findByUsername(logInRquest.getUsername()).orElseThrow(() -> new IllegalArgumentException("User not found."));
        var accessToken = jwtService.generateToken(user);
        var refreshToken = refreshTokenService.createRefreshToken(user.getUsername());

        return AuthResponse.builder()
                          .accessToken(accessToken)
                          .refreshToken(refreshToken.getRefreshToken())
                          .build();
    }
    
    public AuthResponse save(UserDTO userDTO){
        User user = userMapper.toEntity(userDTO);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);
        var accessToken = jwtService.generateToken(savedUser);
        var refreshToken = refreshTokenService.createRefreshToken(savedUser.getUsername());

        return AuthResponse.builder()
                          .accessToken(accessToken)
                          .refreshToken(refreshToken.getRefreshToken())
                          .build();
    }
    public void UpdateUser(String username, UserDTO userDTO){
        List<User> users = userRepository.findAll();
        users = users.stream()
            .map(item -> {
                if(item.getUsername().equals(username)) {
                    item.setFullname(userDTO.getFullname());
                    item.setUsername(userDTO.getUsername());
                    item.setPhonenumber(userDTO.getPhonenumber());
                    item.setAddress(userDTO.getAddress());
                    item.setEmail(userDTO.getEmail());
                    item.setGender(userDTO.getGender());
                    item.setPassword(passwordEncoder.encode(userDTO.getPassword()));
                }
                return item;
            })
            .collect(Collectors.toList());
        

        userRepository.saveAll(users);
    }
    public void delete(Integer id){
        List<User> user = userRepository.findAll();
        List<UserDTO> dto = userMapper.toDto(user);
        UserDTO u =  dto.stream().filter(d -> d.getId() == id).findFirst().orElse(null);
        User user1 = userMapper.toEntity(u);
        userRepository.delete(user1);
    }
    public Map<String, Object> getAllUser() {
        List<User> users = userRepository.findAll();
        int totalUser = users.size();
        Map<String, Integer> UserByDay = new HashMap<>();
        for(User user: users){
            SimpleDateFormat formatter = new SimpleDateFormat("MM/dd/yy");
            String orderDate = formatter.format(user.getCreatedAt());
            UserByDay.put(orderDate, UserByDay.getOrDefault(orderDate, 0) + 1);
        }
        Map<String, Object> response = new HashMap<>();
        response.put("total_user", totalUser);
        response.put("user_list", UserByDay);
        return response;
    }
}
