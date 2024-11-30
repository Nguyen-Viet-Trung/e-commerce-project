package com.example.demo.API.Controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.API.DTO.OrderDetailDTO;
import com.example.demo.API.Service.OrderDetailService;


@Controller
public class OrderDetailController {
    @Autowired
    public OrderDetailService orderDetailService;

    @GetMapping("/orderdetails")
    @ResponseBody
    public List<OrderDetailDTO> findAll() {
        return orderDetailService.findAll();
    }
    @GetMapping("/orderdetails/{orderID}")
    @ResponseBody  
    public List<OrderDetailDTO> findByOrderID(@PathVariable("orderID") String orderID) {
        return orderDetailService.findByOrderID(orderID);
    }

    @PostMapping("/orderdetails")
    public ResponseEntity<OrderDetailDTO> save(@RequestBody OrderDetailDTO orderDetailDTO) {
        orderDetailService.save(orderDetailDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(orderDetailDTO);
    }
}