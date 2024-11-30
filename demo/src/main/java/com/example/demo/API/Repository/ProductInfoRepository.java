package com.example.demo.API.Repository;
import org.springframework.stereotype.Repository;
import com.example.demo.API.Entity.ProductInfo;
import org.springframework.data.jpa.repository.JpaRepository;
@Repository
public interface ProductInfoRepository extends JpaRepository<ProductInfo, Integer> {
    
}
