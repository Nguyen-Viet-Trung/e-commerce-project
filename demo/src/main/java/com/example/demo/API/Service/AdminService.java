package com.example.demo.API.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.API.DTO.AdminDTO;
import com.example.demo.API.Entity.Admin;
import com.example.demo.API.Mapper.AdminMapper;
import com.example.demo.API.Repository.AdminRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final AdminRepository adminRepository;
    private final AdminMapper adminMapper;

    public AdminDTO login(String username, String password){
        List<Admin> admins = adminRepository.findAll();
        List<AdminDTO> adminDTOs = adminMapper.toDto(admins);
        return adminDTOs.stream().filter((admin) -> admin.getUsername().equals(username) && admin.getPassword().equals(password))
                .findFirst().orElse(null);
    }
}
