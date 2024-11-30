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

import com.example.demo.API.DTO.ProductAvailableDTO;
import com.example.demo.API.Service.ProductAvailableService;

@Controller
public class ProductAvailableController {
    @Autowired
    private ProductAvailableService productAvailableService;

    @GetMapping("/productAvailable")
    @ResponseBody
    public List<ProductAvailableDTO> findAll(){
        return productAvailableService.findAll();
    }
    @PutMapping("/updateQuantity")
    public ResponseEntity<String> updateProductQuantity(@RequestBody ProductAvailableDTO productAvailableDTO) {
    try {
        productAvailableService.UpdateProductQuantity(productAvailableDTO);
        return ResponseEntity.ok("Product quantity updated successfully.");
    } catch (Exception e) {
        return ResponseEntity.status(500).body("Error updating product quantity: " + e.getMessage());
    }
}
    @PostMapping("/productAvailable/save")
    public ResponseEntity<String> save(@RequestBody ProductAvailableDTO productAvailableDTO) {
        try {
            productAvailableService.save(productAvailableDTO);
            return ResponseEntity.ok("Product saved successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error saving product: " + e.getMessage());
        }
    }
    @GetMapping("/productAvailable/{productID}")
    public ResponseEntity<List<ProductAvailableDTO>> findByProductID(@PathVariable("productID") String productID) {
        List<ProductAvailableDTO> productAvailables = productAvailableService.findByProductID(productID);
        return ResponseEntity.ok(productAvailables);
    }

    @PutMapping("/productAvailable/{productID}")
    public ResponseEntity<String> update(@RequestBody ProductAvailableDTO productAvailableDTO, @PathVariable("productID") String productID) {
        try {
            productAvailableService.update(productAvailableDTO, productID);
            return ResponseEntity.ok("Product updated successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error updating product: " + e.getMessage());
        }
    }
    
}
