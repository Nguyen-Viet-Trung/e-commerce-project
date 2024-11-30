package com.example.demo.API.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.demo.API.DTO.OrderDTO;
import com.example.demo.API.Entity.Order;
import com.example.demo.API.Mapper.OrderMapper;
import com.example.demo.API.Repository.OrderRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;

    public List<OrderDTO> findAll() {
        List<Order> orders = orderRepository.findAll();
        return orderMapper.toDto(orders);
    }
    public Page<Order> findAllPage(Pageable pageable){
        return orderRepository.findAll(pageable);
    }
    public Page<Order> findByUsernamePageable(String username, Pageable pageable) {
        return orderRepository.findByUsernameContaining(username, pageable);
    }
    public Page<Order> findByStatusPageable(String status, Pageable pageable) {
        return orderRepository.findByStatusContaining(status, pageable);
    }
    public Page<Order> findByOrderIDPageable(String orderID, Pageable pageable) {
        return orderRepository.findByOrderIDContaining(orderID, pageable);
    }
    public Page<Order> findByTotalPricePageable(Integer totalPrice, Pageable pageable) {
        return orderRepository.findByTotalPrice(totalPrice, pageable);
    }
    public List<OrderDTO> findByUsername(String username) {
        List<Order> orders = orderRepository.findAll();
        List<OrderDTO> orderDTOs = orderMapper.toDto(orders);
        return orderDTOs.stream()
                    .filter(order -> order.getUsername().equals(username))
                    .collect(Collectors.toList());
    }
    public OrderDTO findByID(String id) {
        List<Order> orders = orderRepository.findAll();
        List<OrderDTO> orderDTOs = orderMapper.toDto(orders);
        return orderDTOs.stream()
                    .filter(order -> order.getOrderID().equals(id))
                    .findFirst()
                    .orElse(null);
    }
    public void save(OrderDTO orderDTO) {
        Order order = orderMapper.toEntity(orderDTO);
        orderRepository.save(order);
    }
    public Map<String, Object> getTotalOrders() {
        List<Order> orders = orderRepository.findAll();

        int totalOrders = orders.size();
        // Group orders by order_date to calculate orders by day
        Map<String, Integer> ordersByDay = new HashMap<>();
        for (Order order : orders) {
            String orderDate = order.getOrder_date();
            ordersByDay.put(orderDate, ordersByDay.getOrDefault(orderDate, 0) + 1);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("total_order", totalOrders);
        response.put("order_by_days", ordersByDay);
        return response;
    }

    public Map<String, Object> getTotalProfit() {
        List<Order> orders = orderRepository.findAll();
        orders = orders.stream().filter(item -> item.getStatus().equals("success")).collect(Collectors.toList());
        int totalProfit = orders.stream()
                .mapToInt(Order::getTotalPrice)
                .sum();

        // Group profit by order_date
        Map<String, Integer> profitByDay = new HashMap<>();
        for (Order order : orders) {
            String orderDate = order.getOrder_date();
            int profit = order.getTotalPrice();
            profitByDay.put(orderDate, profitByDay.getOrDefault(orderDate, 0) + profit);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("total_profit", totalProfit);
        response.put("profit_by_days", profitByDay);
        return response;
    }
}
