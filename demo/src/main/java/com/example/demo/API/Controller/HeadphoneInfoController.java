package com.example.demo.API.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.API.DTO.HeadphoneInfoDTO;
import com.example.demo.API.Service.HeadphoneInfoService;

@Controller
public class HeadphoneInfoController {
    @Autowired
    private HeadphoneInfoService headphoneInfoService;

    @GetMapping("/headphoneInfo")
    @ResponseBody
    public List<HeadphoneInfoDTO> findAll() {
        return headphoneInfoService.findAll();
    }
    @PostMapping("/headphoneInfo/save")
    public ResponseEntity<String> save(@RequestBody HeadphoneInfoDTO headphoneInfoDTO) {
        try {
            headphoneInfoService.save(headphoneInfoDTO);
            return ResponseEntity.ok("HeadphoneInfo saved successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error saving HeadphoneInfo: " + e.getMessage());
        }
    }

    @GetMapping("/headphoneInfo/{productID}")
    @ResponseBody
    public ResponseEntity<HeadphoneInfoDTO> findByProductID(@PathVariable("productID") String productID) {
        return ResponseEntity.ok(headphoneInfoService.findByProductID(productID));
    }
    @PutMapping("/headphoneInfo/{productID}")
    public ResponseEntity<String> updateInfo(@RequestBody HeadphoneInfoDTO headphoneInfoDTO, @PathVariable("productID") String productID) {
        try {
            headphoneInfoService.updateInfo(headphoneInfoDTO, productID);
            return ResponseEntity.ok("HeadphoneInfo updated successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error updating HeadphoneInfo: " + e.getMessage());
        }
    }
}
