package com.example.demo.API.Mapper;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.example.demo.API.DTO.ProductInfoDTO;
import com.example.demo.API.Entity.ProductInfo;
@Component
public class ProductInfoMapper implements EntityMapper<ProductInfo, ProductInfoDTO> {
    @Override
    public ProductInfo toEntity(ProductInfoDTO dto) {
        return ProductInfo.builder()
                .id(dto.getId())
                .productID(dto.getProductID())
                .CPU(dto.getCPU())
                .RAM(dto.getRAM())
                .hardDrive(dto.getHardDrive())
                .GPU(dto.getGPU())
                .Display(dto.getDisplay())
                .battery(dto.getBattery())
                .build();
    }

    @Override
    public ProductInfoDTO toDto(ProductInfo entity) {
        return ProductInfoDTO.builder()
                .id(entity.getId())
                .productID(entity.getProductID())
                .CPU(entity.getCPU())
                .RAM(entity.getRAM())
                .hardDrive(entity.getHardDrive())
                .GPU(entity.getGPU())
                .Display(entity.getDisplay())
                .battery(entity.getBattery())
                .build();
    }
    @Override
    public List<ProductInfoDTO> toDto(List<ProductInfo> entity) {
        List<ProductInfoDTO> dtos = new ArrayList<>();
        entity.forEach(product -> {
            ProductInfoDTO dto = toDto(product);
            dtos.add(dto);
        });
        return dtos;
    }

    @Override
    public List<ProductInfo> toEntity(List<ProductInfoDTO> dto) {
        List<ProductInfo> entities = new ArrayList<>();
        dto.forEach(product -> {
            ProductInfo entity = toEntity(product);
            entities.add(entity);
        });
        return entities;
    }
}
