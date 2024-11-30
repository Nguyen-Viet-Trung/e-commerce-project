package com.example.demo.API.Controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.API.DTO.AdminDTO;
import com.example.demo.API.Service.AdminService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/admin")
@RequiredArgsConstructor
public class AdminController {
    private final AdminService adminService;

    @PostMapping("/login")
    public ResponseEntity<AdminDTO> login(@RequestBody AdminDTO adminRequest) {
        AdminDTO admin = adminService.login(adminRequest.getUsername(), adminRequest.getPassword());
        if(admin != null){
            return ResponseEntity.ok(admin);
        }
        else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
    @PostMapping("/logout")
    public ResponseEntity<Void> logout (){
        return ResponseEntity.noContent().build();
    }
}
