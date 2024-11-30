package com.example.demo.API.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import com.example.demo.API.DTO.ProductInfoDTO;
import com.example.demo.API.Service.ProductInfoService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
public class ProductInfoController {
    @Autowired
    private ProductInfoService productInfoService;

    @GetMapping("/productInfo")
    @ResponseBody
    public List<ProductInfoDTO> findAll(){
        return productInfoService.findAll();
    }
    
    @PostMapping("/productInfo/save")
    public ResponseEntity<String> save(@RequestBody ProductInfoDTO productInfoDTO){
        productInfoService.save(productInfoDTO);
        return ResponseEntity.ok("ProductInfo saved successfully.");
    }
    @GetMapping("/productInfo/{productID}")
    @ResponseBody
    public ProductInfoDTO findByProductID(@PathVariable("productID") String productID){
        return productInfoService.findByProductID(productID);
    }
    @PutMapping("/productInfo/{productID}")
    public ResponseEntity<String> updateInfo(@RequestBody ProductInfoDTO productInfoDTO, @PathVariable("productID") String productID){
        productInfoService.updateInfo(productInfoDTO, productID);
        return ResponseEntity.ok("ProductInfo updated successfully.");
    }
}
