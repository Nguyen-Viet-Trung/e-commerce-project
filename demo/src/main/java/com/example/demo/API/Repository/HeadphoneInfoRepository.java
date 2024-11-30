package com.example.demo.API.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.API.Entity.HeadphoneInfo;
@Repository
public interface HeadphoneInfoRepository extends JpaRepository<HeadphoneInfo, Integer> {
    
}
