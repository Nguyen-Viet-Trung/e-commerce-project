package com.example.demo.API.Repository;

import org.springframework.stereotype.Repository;

import com.example.demo.API.DTO.ProductTypeStatDTO;
import com.example.demo.API.Entity.Product;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
@Repository
public interface ProductRepository extends JpaRepository<Product,Integer>{
    @Query("SELECT new com.example.demo.API.DTO.ProductTypeStatDTO(p.productType, SUM(p.sold)) " +
           "FROM Product p GROUP BY p.productType")
    List<ProductTypeStatDTO> findProductTypeStats();

    Page<Product> findAll(Pageable pageable);
    
    
    Page<Product> findByNameContaining(String name, Pageable pageable);
    Page<Product> findByProductTypeContaining(String brand, Pageable pageable);
    Page<Product> findBySellingPrice(Long sellingPrice, Pageable pageable);
    Page<Product> findByProductIDContaining(String productID, Pageable pageable);
}
