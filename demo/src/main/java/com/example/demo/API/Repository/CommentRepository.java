package com.example.demo.API.Repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.API.Entity.Comment;
@Repository
public interface CommentRepository extends JpaRepository<Comment, String>{
    Page<Comment> findAll(Pageable pageable);
    
}
