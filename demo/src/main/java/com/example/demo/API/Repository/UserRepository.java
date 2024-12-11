package com.example.demo.API.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Component;

import com.example.demo.API.Entity.User;

import jakarta.transaction.Transactional;

import java.util.Optional;


@Component
public interface UserRepository extends JpaRepository<User,Integer>{
    Optional<User> findByEmail(String email);

    @Transactional
    @Modifying
    @Query("update User u set u.password = ?1 where u.email = ?2")
    void updatePassword(String password, String email);

    Optional<User> findByUsername(String username);
}
