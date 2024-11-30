package com.example.demo.API.Mapper;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.example.demo.API.DTO.OrderDTO;
import com.example.demo.API.Entity.Order;

@Component
public class OrderMapper implements EntityMapper<Order, OrderDTO>{
    @Override
    public Order toEntity(OrderDTO dto){
        return Order.builder()
                .orderID(dto.getOrderID())
                .username(dto.getUsername())
                .fullname(dto.getFullname())
                .phonenumber(dto.getPhonenumber())
                .address(dto.getAddress())
                .email(dto.getEmail())
                .status(dto.getStatus())
                .order_date(dto.getOrder_date())
                .totalPrice(dto.getTotalPrice())
                .payment_method(dto.getPayment_method())
                .paid(dto.getPaid())
                .delivery_state(dto.getDelivery_state())
                .build();
    }

    @Override
    public OrderDTO toDto(Order entity){
        return OrderDTO.builder()
                .orderID(entity.getOrderID())
                .username(entity.getUsername())
                .fullname(entity.getFullname())
                .phonenumber(entity.getPhonenumber())
                .address(entity.getAddress())
                .email(entity.getEmail())
                .status(entity.getStatus())
                .order_date(entity.getOrder_date())
                .totalPrice(entity.getTotalPrice())
                .payment_method(entity.getPayment_method())
                .paid(entity.getPaid())
                .delivery_state(entity.getDelivery_state())
                .build();
    }
    @Override
    public List<OrderDTO> toDto(List<Order> entity){
        List<OrderDTO> dtos = new ArrayList<>();
        entity.forEach(e -> {
            OrderDTO dto = toDto(e);
            dtos.add(dto);
        });
        return dtos;
    }
    @Override
    public List<Order> toEntity(List<OrderDTO> dto){
        List<Order> entities = new ArrayList<>();
        dto.forEach(e -> {
            Order entity = toEntity(e);
            entities.add(entity);
        });
        return entities;
    }
}
