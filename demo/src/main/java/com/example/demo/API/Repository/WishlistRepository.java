package com.example.demo.API.Repository;

import org.springframework.stereotype.Repository;

import com.example.demo.API.Entity.Wishlist;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface WishlistRepository extends JpaRepository<Wishlist,String>{
    
}
