package com.example.demo.API.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.API.Entity.ForgotPassword;
import com.example.demo.API.Entity.User;

import jakarta.transaction.Transactional;

public interface ForgotPasswordRepository extends JpaRepository<ForgotPassword, Integer>{
    @Query("select fp from ForgotPassword fp where fp.otp = ?1 and fp.user = ?2")
    Optional<ForgotPassword> findByOtpAndUser(Integer otp, User user);

    @Transactional
    @Modifying
    @Query("Delete from ForgotPassword fp where  fp.user = :user")
    void deleteByUser(@Param("user") User user);
}
