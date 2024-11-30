package com.example.demo.API.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.API.DTO.OrderDTO;
import com.example.demo.API.Entity.Order;
import com.example.demo.API.Service.OrderService;

@Controller
public class UserOrderController {
    @Autowired
    private OrderService orderService;
    
    @GetMapping("/orders")
    @ResponseBody
    public List<OrderDTO> findAll(){
        return orderService.findAll();
    }

    @PostMapping("/orders/save")
    public ResponseEntity<String> saveOrder (@RequestBody OrderDTO orderDTO){
        try{
            orderService.save(orderDTO);
            return ResponseEntity.ok("Order saved successfully");
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving order: " + e.getMessage());
        }    
    }
    @GetMapping("/orders/pagination/username/{username}")
    @ResponseBody
    public Page<Order> findByUsernamePageable(@PathVariable("username") String username, Pageable pageable){
        return orderService.findByUsernamePageable(username, pageable);
    }
    @GetMapping("/orders/pagination/status/{status}")
    @ResponseBody
    public Page<Order> findByStatusPageable(@PathVariable("status") String status, Pageable pageable){
        return orderService.findByStatusPageable(status, pageable);
    }
    @GetMapping("/orders/pagination/orderID/{orderID}")
    @ResponseBody
    public Page<Order> findByOrderIDPageable(@PathVariable("orderID") String orderID, Pageable pageable){
        return orderService.findByOrderIDPageable(orderID, pageable);
    }
    @GetMapping("/orders/pagination/totalPrice/{totalPrice}")
    @ResponseBody
    public Page<Order> findByTotalPricePageable(@PathVariable("totalPrice") Integer totalPrice, Pageable pageable){
        return orderService.findByTotalPricePageable(totalPrice, pageable);
    }
    @GetMapping("/orders/{username}")
    @ResponseBody
    public List<OrderDTO> findByUsername(@PathVariable("username") String username){
        return orderService.findByUsername(username);
    }
    @GetMapping("/orders/byid/{id}")
    @ResponseBody
    public OrderDTO findByID(@PathVariable String id){
        return orderService.findByID(id);
    }
    @GetMapping("/admin/total_order")
    @ResponseBody
    public Map<String, Object> getTotalOrders() {
        return orderService.getTotalOrders();
    }

    @GetMapping("/admin/total_profit")
    @ResponseBody
    public Map<String, Object> getTotalProfit() {
        return orderService.getTotalProfit();
    }

    @GetMapping("/orders/pagination")
    @ResponseBody
    public Page<Order> getPageOrders(Pageable pageable){
        return orderService.findAllPage(pageable);
    }
}
