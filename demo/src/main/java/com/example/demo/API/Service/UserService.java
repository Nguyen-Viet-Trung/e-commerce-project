package com.example.demo.API.Service;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


import org.springframework.stereotype.Service;


import com.example.demo.API.DTO.UserDTO;
import com.example.demo.API.Entity.User;
import com.example.demo.API.Mapper.UserMapper;
import com.example.demo.API.Repository.UserRepository;


import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

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
    public UserDTO login(String username, String password){
        List<User> users = userRepository.findAll();
        List<UserDTO> userDTO = userMapper.toDto(users);
        return userDTO.stream()
                      .filter(user -> user.getUsername().equals(username) && user.getPassword().equals(password))
                      .findFirst()
                      .orElse(null);
    }
    
    public void save(UserDTO userDTO){
        User user = userMapper.toEntity(userDTO);
        userRepository.save(user);
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
                    item.setPassword(userDTO.getPassword());
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
