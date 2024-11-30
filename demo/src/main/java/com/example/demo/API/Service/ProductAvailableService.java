package com.example.demo.API.Service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.demo.API.DTO.ProductAvailableDTO;
import com.example.demo.API.Entity.ProductAvailable;
import com.example.demo.API.Mapper.ProductAvailableMapper;
import com.example.demo.API.Repository.ProductAvailableRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductAvailableService {
    private final ProductAvailableRepository productAvailableRepository;
    private final ProductAvailableMapper productAvailableMapper;

    public List<ProductAvailableDTO> findAll(){
        List<ProductAvailable> productAvailables = productAvailableRepository.findAll();
        return productAvailableMapper.toDto(productAvailables);
    }

    public void UpdateProductQuantity(ProductAvailableDTO productAvailableDTO) {
        String productID = productAvailableDTO.getProductID();
        String color = productAvailableDTO.getColor();
        Integer quantity = productAvailableDTO.getAvailable();
        List<ProductAvailable> productAvailables = productAvailableRepository.findAll();

        productAvailables.stream()
            .filter(item -> item.getProductID().equals(productID) && item.getColor().equals(color))
            .findFirst()
            .ifPresent(item -> {
                Integer newAvailable = item.getAvailable() - quantity;
                item.setAvailable(newAvailable);
                productAvailableRepository.save(item);
            });
    }
    public void save(ProductAvailableDTO productAvailableDTO) {
        ProductAvailable productAvailable = productAvailableMapper.toEntity(productAvailableDTO);
        productAvailableRepository.save(productAvailable);
    }
    public List<ProductAvailableDTO> findByProductID(String productID){
        List<ProductAvailable> productAvailables = productAvailableRepository.findAll();
        List<ProductAvailable> response = productAvailables.stream().filter(item -> item.getProductID().equals(productID)).collect(Collectors.toList());
        return productAvailableMapper.toDto(response);
    }
    public void update(ProductAvailableDTO productAvailableDTO, String productID) {
        List<ProductAvailable> productAvailables = productAvailableRepository.findAll();

        productAvailables = productAvailables.stream().map(item -> {
            if (item.getProductID().equals(productID) && item.getId() == productAvailableDTO.getId()) {
                item.setColor(productAvailableDTO.getColor());
                item.setAvailable(productAvailableDTO.getAvailable());
            }
            return item;
        }).collect(Collectors.toList());

        productAvailableRepository.saveAll(productAvailables);
        
    }
}
