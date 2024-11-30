package com.example.demo.API.Mapper;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.example.demo.API.DTO.AdminDTO;
import com.example.demo.API.Entity.Admin;

@Component
public class AdminMapper implements EntityMapper<Admin, AdminDTO>{
    @Override
    public Admin toEntity(AdminDTO dto) {
        return Admin.builder()
                .id(dto.getId())
                .username(dto.getUsername())
                .fullname(dto.getFullname())
                .password(dto.getPassword())
                .build();
    }
    @Override
    public AdminDTO toDto(Admin entity) {
        return AdminDTO.builder()
                .id(entity.getId())
                .username(entity.getUsername())
                .fullname(entity.getFullname())
                .password(entity.getPassword())
                .build();
    }
    @Override
    public List<AdminDTO> toDto(List<Admin> entity) {
        List<AdminDTO> dtos = new ArrayList<>();
        entity.forEach(e -> {
            AdminDTO dto = toDto(e);
            dtos.add(dto);
        });
        return dtos;
    }

    @Override
    public List<Admin> toEntity(List<AdminDTO> dto) {
        List<Admin> list = new ArrayList<>();
        dto.forEach(e -> {
            Admin admin = toEntity(e);
            list.add(admin);
        });
        return list;
    }
}
