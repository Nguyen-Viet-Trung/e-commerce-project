package com.example.demo.API.Mapper;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.example.demo.API.DTO.WishlistDTO;

import com.example.demo.API.Entity.Wishlist;

@Component
public class WishlistMapper implements EntityMapper<Wishlist, WishlistDTO>{
    @Override
    public Wishlist toEntity(WishlistDTO dto){
        return Wishlist.builder()
        .id(dto.getId())
        .username(dto.getUsername())
        .productId(dto.getProduct_id())
        .build();
    }
    @Override
    public WishlistDTO toDto(Wishlist entity){
        return WishlistDTO.builder()
        .id(entity.getId())
        .username(entity.getUsername())
        .product_id(entity.getProductId())
        .build();
    }
    @Override
    public List<Wishlist> toEntity(List<WishlistDTO> dto){
        List<Wishlist> entities = new ArrayList<>();
        dto.forEach(dtoP ->{
            Wishlist wishlist = toEntity(dtoP);
            entities.add(wishlist);
        });
        return entities;
    }
    @Override
    public List<WishlistDTO> toDto(List<Wishlist> entity){
        List<WishlistDTO> dtos = new ArrayList<>();
        entity.forEach(e ->{
            WishlistDTO dto = toDto(e);
            dtos.add(dto);
        });
        return dtos;
    }
}
