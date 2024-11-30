package com.example.demo.API.Service;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

import com.example.demo.API.DTO.OrderDetailDTO;
import com.example.demo.API.Entity.OrderDetail;
import com.example.demo.API.Mapper.OrderDetailMapper;
import com.example.demo.API.Repository.OrderDetailRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderDetailService {
    private final OrderDetailRepository orderDetailRepository;
    private final OrderDetailMapper orderDetailMapper;
    

    public List<OrderDetailDTO> findAll() {
        List<OrderDetail> orderDetails = orderDetailRepository.findAll();
        return orderDetailMapper.toDto(orderDetails);
    }

    public List<OrderDetailDTO> findByOrderID (String orderID){
        List<OrderDetail> orderDetails = orderDetailRepository.findAll();
        List<OrderDetailDTO> dtos = orderDetailMapper.toDto(orderDetails);
        return dtos.stream()
                .filter(order -> order.getOrderID().equals(orderID))
                .collect(Collectors.toList());
    }

    public void save (OrderDetailDTO orderDetailDTO){
        OrderDetail orderDetail = orderDetailMapper.toEntity(orderDetailDTO);
        orderDetailRepository.save(orderDetail);
    }
}
