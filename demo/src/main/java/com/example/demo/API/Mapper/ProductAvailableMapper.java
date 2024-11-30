package com.example.demo.API.Mapper;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.example.demo.API.DTO.ProductAvailableDTO;
import com.example.demo.API.Entity.ProductAvailable;
@Component
public class ProductAvailableMapper implements EntityMapper<ProductAvailable, ProductAvailableDTO> {
    @Override
    public ProductAvailable toEntity(ProductAvailableDTO dto) {
        return ProductAvailable.builder()
                .id(dto.getId())
                .available(dto.getAvailable())
                .color(dto.getColor())
                .productID(dto.getProductID())
                .build();
    }

    @Override
    public ProductAvailableDTO toDto(ProductAvailable entity) {
        return ProductAvailableDTO.builder()
                .id(entity.getId())
                .available(entity.getAvailable())
                .color(entity.getColor())
                .productID(entity.getProductID())
                .build();
    }

    @Override
    public List<ProductAvailable> toEntity(List<ProductAvailableDTO> dto) {
        List<ProductAvailable> entities = new ArrayList<>();
        dto.forEach(dtoP -> {
            ProductAvailable product = toEntity(dtoP);
            entities.add(product);
        });
        return entities;
    }

    @Override
    public List<ProductAvailableDTO> toDto(List<ProductAvailable> entity) {
        List<ProductAvailableDTO> dtos = new ArrayList<>();
        entity.forEach(product -> {
            ProductAvailableDTO dto = toDto(product);
            dtos.add(dto);
        });
        return dtos;
    }
}
