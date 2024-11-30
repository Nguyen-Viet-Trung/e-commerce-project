package com.example.demo.API.Mapper;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.example.demo.API.DTO.UserDTO;
import com.example.demo.API.Entity.User;
@Component
public class UserMapper implements EntityMapper<User, UserDTO>{
    @Override
    public User toEntity(UserDTO userDTO) {
        return User.builder()
        .id(userDTO.getId())
        .fullname(userDTO.getFullname())
        .username(userDTO.getUsername())
        .phonenumber(userDTO.getPhonenumber())
        .address(userDTO.getAddress())
        .email(userDTO.getEmail())
        .gender(userDTO.getGender())
        .createdAt(userDTO.getCreatedAt())
        .password(userDTO.getPassword())
        .build();
    }
    @Override
    public UserDTO toDto(User user) {
        return UserDTO.builder()
        .id(user.getId())
        .fullname(user.getFullname())
        .username(user.getUsername())
        .phonenumber(user.getPhonenumber())
        .address(user.getAddress())
        .email(user.getEmail())
        .gender(user.getGender())
        .createdAt(user.getCreatedAt())
        .password(user.getPassword())
        .build();
    }
    @Override
    public List<UserDTO> toDto(List<User> entity) {
        List<UserDTO> list = new ArrayList<>();
        entity.forEach(e -> {
            list.add(toDto(e));
        });
        return list;
    }

    @Override
    public List<User> toEntity(List<UserDTO> dto) {
        List<User> list = new ArrayList<>();
        dto.forEach(e -> {
            list.add(toEntity(e));
        });
        return list;
    }
}
