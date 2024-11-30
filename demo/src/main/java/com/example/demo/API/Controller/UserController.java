package com.example.demo.API.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.API.DTO.UserDTO;
import com.example.demo.API.Service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    
    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> users = userService.findAll();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{username}")
    public ResponseEntity<UserDTO> getUserByUsername(@PathVariable String username) {
        UserDTO user = userService.findByUsername(username);
        return user != null ? ResponseEntity.ok(user) : ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }    

    @PutMapping("/{username}")
    public ResponseEntity<Void> updateUser(@PathVariable String username, @RequestBody UserDTO userDTO) {
        userService.UpdateUser(username, userDTO);
        return ResponseEntity.noContent().build();
    }
    @PostMapping
    public ResponseEntity<UserDTO> createUser(@RequestBody UserDTO userDTO) {
        userService.save(userDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(userDTO);
    }
    @PostMapping("/login")
    public ResponseEntity<UserDTO> login(@RequestBody UserDTO loginRequest) {
    UserDTO user = userService.login(loginRequest.getUsername(), loginRequest.getPassword());
    
    if (user != null) {
        return ResponseEntity.ok(user); // Successful login, returning user data
    } else {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // Invalid credentials
    }
}
    @PostMapping("/logout")
    public ResponseEntity<Void> logout() {
        return ResponseEntity.noContent().build(); 
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
    @GetMapping("graph_users")
    @ResponseBody
    public Map<String, Object> getGraphUser(){
        return userService.getAllUser();
    }
}

