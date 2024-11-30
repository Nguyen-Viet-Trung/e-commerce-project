package com.example.demo.API.Mapper;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.example.demo.API.DTO.OrderDetailDTO;
import com.example.demo.API.Entity.OrderDetail;

@Component
public class OrderDetailMapper implements EntityMapper<OrderDetail, OrderDetailDTO>{
    @Override
    public OrderDetail toEntity(OrderDetailDTO dto) {
        return OrderDetail.builder()
                .id(dto.getId())
                .product_id(dto.getProductID())
                .productName(dto.getProductName())
                .color(dto.getColor())
                .orderID(dto.getOrderID())
                .price(dto.getPrice())
                .quantity(dto.getQuantity())
                .build();
    }

    @Override
    public OrderDetailDTO toDto(OrderDetail entity) {
        return OrderDetailDTO.builder()
                .id(entity.getId())
                .productID(entity.getProduct_id())
                .productName(entity.getProductName())
                .color(entity.getColor())
                .orderID(entity.getOrderID())
                .price(entity.getPrice())
                .quantity(entity.getQuantity())
                .build();
    }

    @Override
    public List<OrderDetail> toEntity(List<OrderDetailDTO> dto) {
        List<OrderDetail> list = new ArrayList<>();
        dto.forEach(e -> {
            OrderDetail detail = toEntity(e);
            list.add(detail);
        });
        return list;
    }

    @Override
    public List<OrderDetailDTO> toDto(List<OrderDetail> entity) {
        List<OrderDetailDTO> dtos = new ArrayList<>();
        entity.forEach(e -> {
            OrderDetailDTO dto = toDto(e);
            dtos.add(dto);
        });
        return dtos;
    }
}
