package com.example.demo.API.Mapper;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.example.demo.API.DTO.CommentDTO;
import com.example.demo.API.Entity.Comment;
@Component
public class CommentMapper implements EntityMapper<Comment,CommentDTO> {
    @Override
    public Comment toEntity(CommentDTO dto){
        return Comment.builder()
        .id(dto.getId())
        .username(dto.getUsername())
        .productId(dto.getProductId())
        .comment(dto.getComment())
        .date(dto.getDate())
        .rating(dto.getRating())
        .build();
    }
    @Override
    public CommentDTO toDto(Comment entity){
        return CommentDTO.builder()
        .id(entity.getId())
        .username(entity.getUsername())
        .productId(entity.getProductId())
        .comment(entity.getComment())
        .date(entity.getDate())
        .rating(entity.getRating())
        .build();
    }

    @Override
    public List<Comment> toEntity(List<CommentDTO> dto){
        List<Comment> entities = new ArrayList<>();
        dto.forEach(dtoP ->{
            Comment comment = toEntity(dtoP);
            entities.add(comment);
        });
        return entities;
    }
    @Override
    public List<CommentDTO> toDto(List<Comment> entity){
        List<CommentDTO> dtos = new ArrayList<>();
        entity.forEach(entityP ->{
            CommentDTO dto = toDto(entityP);
            dtos.add(dto);
        });
        return dtos;
    }
}
