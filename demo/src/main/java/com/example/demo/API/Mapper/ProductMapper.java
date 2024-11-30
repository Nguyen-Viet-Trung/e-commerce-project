package com.example.demo.API.Mapper;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.example.demo.API.DTO.ProductDTO;
import com.example.demo.API.Entity.Product;
@Component
public class ProductMapper implements EntityMapper<Product,ProductDTO>{
    @Override
    public Product toEntity(ProductDTO dto){
        return Product.builder()
                .id(dto.getId())
                .brand(dto.getBrand())
                .productID(dto.getProductID())
                .name(dto.getName())
                .sellingPrice(dto.getSellingPrice())
                .originalPrice(dto.getOriginalPrice())
                .image(dto.getImage())
                .image1(dto.getImage1())
                .image2(dto.getImage2())
                .description(dto.getDescription())
                .sold(dto.getSold())
                .productType(dto.getProductType())
                .createdDate(dto.getCreatedDate())
                .build();
    }
    @Override
    public ProductDTO toDto(Product entity){
        return ProductDTO.builder()
                .id(entity.getId())
                .brand(entity.getBrand())
                .productID(entity.getProductID())
                .name(entity.getName())
                .sellingPrice(entity.getSellingPrice())
                .originalPrice(entity.getOriginalPrice())
                .image(entity.getImage())
                .image1(entity.getImage1())
                .image2(entity.getImage2())
                .description(entity.getDescription())
                .sold(entity.getSold())
                .productType(entity.getProductType())
                .createdDate(entity.getCreatedDate())
                .build();
    }
    @Override
    public List<Product> toEntity(List<ProductDTO> dto){
        List<Product> entities = new ArrayList<>();
        dto.forEach(dtoP ->{
            Product product = toEntity(dtoP);
            entities.add(product);
        });
        return entities;
    }
    @Override
    public List<ProductDTO> toDto(List<Product> entity){
        List<ProductDTO> dtos = new ArrayList<>();
        entity.forEach(product ->{
            ProductDTO dto = toDto(product);
            dtos.add(dto);
        });
        return dtos;
    }
}
