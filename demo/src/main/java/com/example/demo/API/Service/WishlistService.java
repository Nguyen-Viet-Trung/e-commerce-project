package com.example.demo.API.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.API.DTO.WishlistDTO;
import com.example.demo.API.Entity.Wishlist;
import com.example.demo.API.Mapper.WishlistMapper;
import com.example.demo.API.Repository.WishlistRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WishlistService {
    private final WishlistRepository wishlistRepository;
    private final WishlistMapper wishlistMapper;

    public List<WishlistDTO> findAll(){
        List<Wishlist> wishlist = wishlistRepository.findAll();
        return wishlistMapper.toDto(wishlist);
    }
    public void save(WishlistDTO wishlistDTO){
        Wishlist wishlist = wishlistMapper.toEntity(wishlistDTO);
        wishlistRepository.save(wishlist);
    }
    @Transactional
    public void delete(WishlistDTO wishlistDTO){
        Wishlist wishlist = wishlistMapper.toEntity(wishlistDTO);
        wishlistRepository.delete(wishlist);
    }
}
