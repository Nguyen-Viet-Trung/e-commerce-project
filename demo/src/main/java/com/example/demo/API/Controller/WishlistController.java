package com.example.demo.API.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.API.DTO.WishlistDTO;
import com.example.demo.API.Service.WishlistService;

@Controller
public class WishlistController {
    @Autowired
    private WishlistService wishlistService;
    @GetMapping("/wishlist")
    @ResponseBody
    public List<WishlistDTO> findAll(){
        return wishlistService.findAll();
    }

    @PostMapping("/wishlist/save")
    public ResponseEntity<String> save(@RequestBody WishlistDTO wishlistDTO) {
        try {
            wishlistService.save(wishlistDTO);
            return ResponseEntity.ok("Wishlist saved successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error saving wishlist: " + e.getMessage());
        }
    }
    @DeleteMapping("/wishlist/delete")
    public ResponseEntity<String> delete(@RequestBody WishlistDTO wishlistDTO) {
        try {
            wishlistService.delete(wishlistDTO);
            return ResponseEntity.ok("Wishlist delete successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error saving wishlist: " + e.getMessage());
        }
    }
}