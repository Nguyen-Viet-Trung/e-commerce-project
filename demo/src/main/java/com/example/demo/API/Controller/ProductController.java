package com.example.demo.API.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.API.DTO.ProductDTO;
import com.example.demo.API.DTO.ProductTypeStatDTO;
import com.example.demo.API.Entity.Product;
import com.example.demo.API.Service.ProductService;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@Controller
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping("/products")
    @ResponseBody
    public List<ProductDTO> findAll() {
        return productService.findAll();
    }
    @GetMapping("/products/pagination")
    @ResponseBody
    public Page<Product> findAllPage(Pageable pageable) {
        return productService.findAllPage(pageable);
    }
    @GetMapping("/products/pagination/productName/{productName}")
    @ResponseBody
    public Page<Product> findProductNamePagination(@PathVariable("productName") String productName, Pageable pageable) {
        return productService.findProductNamePagination(pageable, productName);
    }
    @GetMapping("/products/pagination/productID/{productID}")
    @ResponseBody
    public Page<Product> findProductIDPagination(@PathVariable("productID") String productID, Pageable pageable) {
        return productService.findProductIDPagination(pageable, productID);
    }
    @GetMapping("/products/pagination/productType/{productType}")
    @ResponseBody
    public Page<Product> findProductTypePagination(@PathVariable("productType") String productType, Pageable pageable) {
        return productService.findProductTypePagination(pageable, productType);
    }
    @GetMapping("/products/pagination/price/{price}")
    @ResponseBody
    public Page<Product> findProduct(@PathVariable("price") Long price, Pageable pageable) {
        return productService.findSellingPricePagination(pageable, price);
    }
    @GetMapping("/view/product/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable("id") int id){
        ProductDTO productDTO = productService.findById(id);
        if(productDTO != null){
            return ResponseEntity.ok(productDTO);
        }
        else{
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/view/productID/{productID}")
    public ResponseEntity<ProductDTO> getProductByProductID(@PathVariable("productID") String productID){
        ProductDTO productDTO = productService.findByProductID(productID);
        if(productDTO != null){
            return ResponseEntity.ok(productDTO);
        }
        else{
            return ResponseEntity.notFound().build();
        }
    }
    @PutMapping("/updateSold")
    public ResponseEntity<String> updateSold(@RequestBody ProductDTO product){
        try{
        productService.Update(product);
        return ResponseEntity.ok("Product sold updated successfully");
        }
        catch(Exception e){
            return ResponseEntity.status(500).body("Error updating product sold: " + e.getMessage());
        }
    }
    @PutMapping("/admin/products/update/{id}")
    public ResponseEntity<String> updateProduct(@RequestBody ProductDTO productDTO, @PathVariable("id") int id){
        try{
            productService.updateProduct(productDTO, id);
            return ResponseEntity.ok("Product updated successfully");
        }catch(Exception e){
            return ResponseEntity.status(500).body("Error updating product: "+ e.getMessage());
        }
    }
    @DeleteMapping("/admin/products/delete/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable("id") int id){
        try{
            productService.deleteProduct(id);
            return ResponseEntity.ok("Product deleted successfully");
        }
        catch(Exception e){
            return ResponseEntity.status(500).body("Error delete product: "+e.getMessage());
        }
    }
    @PostMapping("/admin/products/add")
    public ResponseEntity<String> addProduct(@RequestBody ProductDTO productDTO){
        try{
            productService.saveProduct(productDTO);
            return ResponseEntity.ok("Product saved successfully");
        }
        catch(Exception e){
            return ResponseEntity.status(500).body("Error: "+e.getMessage());
        }
    }
    @GetMapping("/admin/trending_products")
    @ResponseBody
    public List<ProductDTO> getTrendingProducts() {
        return productService.getTrendingProduct();
    }
    @GetMapping("admin/top_category")
    @ResponseBody
    public List<ProductTypeStatDTO> getTopCategories() {
        return productService.getProductTypeStat();
    }
}
