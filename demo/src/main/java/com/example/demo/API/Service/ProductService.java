package com.example.demo.API.Service;

import java.util.List;

import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.demo.API.DTO.ProductDTO;
import com.example.demo.API.DTO.ProductTypeStatDTO;
import com.example.demo.API.Entity.Product;
import com.example.demo.API.Mapper.ProductMapper;
import com.example.demo.API.Repository.ProductRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    public List<ProductDTO> findAll(){
        List<Product> products = productRepository.findAll();
        return productMapper.toDto(products);
    }
    public Page<Product> findAllPage(Pageable pageable){
        return productRepository.findAll(pageable);
    }
    public Page<Product> findProductNamePagination(Pageable pageable, String productName){
        return productRepository.findByNameContaining(productName, pageable);
    }
    public Page<Product> findProductTypePagination(Pageable pageable, String productType){
        return productRepository.findByProductTypeContaining(productType, pageable);
    }
    public Page<Product> findSellingPricePagination(Pageable pageable, Long sellingPrice){
        return productRepository.findBySellingPrice(sellingPrice, pageable);
    }
    public Page<Product> findProductIDPagination(Pageable pageable, String productID){
        return productRepository.findByProductIDContaining(productID, pageable);
    }
    public ProductDTO findById(int id){
        List<Product> products = productRepository.findAll();
        List<ProductDTO> productDTO = productMapper.toDto(products);
        return productDTO.stream().filter(product -> product.getId() == id)
        .findFirst().orElse(new ProductDTO());
    }
    public ProductDTO findByProductID(String productID){
        List<Product> products = productRepository.findAll();
        List<ProductDTO> productDTO = productMapper.toDto(products);
        return productDTO.stream().filter(product -> product.getProductID().equals(productID))
        .findFirst().orElse(new ProductDTO());
    }
    public List<ProductDTO> sortByName(){
        List<Product> products = productRepository.findAll();
        List<ProductDTO> productDTO = productMapper.toDto(products);
        List<ProductDTO> response = productDTO.stream().sorted((a,b) -> (a.getName().compareTo(b.getName()))).collect(Collectors.toList());
        return response;
    }
    public void Update(ProductDTO product){
        List<Product> products = productRepository.findAll();
        products.stream()
        .filter(p -> p.getProductID().equals(product.getProductID()))
        .findFirst()    
        .ifPresent(p -> {
            Integer newSold = product.getSold();            
            p.setSold(newSold +p.getSold());
            productRepository.save(p);
        });
    }
    public void updateProduct(ProductDTO productDTO, int id){
        List<Product> products = productRepository.findAll();
        products = products.stream().map(item ->{
            if(item.getId() == id){
                item.setName(productDTO.getName());
                item.setBrand(productDTO.getBrand());
                item.setSellingPrice(productDTO.getSellingPrice());
                item.setOriginalPrice(productDTO.getOriginalPrice());
                item.setImage(productDTO.getImage());
                item.setImage1(productDTO.getImage1());
                item.setImage2(productDTO.getImage2());
                item.setDescription(productDTO.getDescription());
                item.setProductType(productDTO.getProductType());
                item.setSold(productDTO.getSold());
            }
            return item;
        })
        .collect(Collectors.toList());

        productRepository.saveAll(products);
    }
    public void deleteProduct(Integer id){
        List<Product> products = productRepository.findAll();
        List<ProductDTO> dtos = productMapper.toDto(products);
        ProductDTO dto = dtos.stream().filter(p -> p.getId() == id).findFirst().orElse(null);
        Product deleteP = productMapper.toEntity(dto);
        productRepository.delete(deleteP);
    }
    public void saveProduct(ProductDTO productDTO){
        Product newProduct = productMapper.toEntity(productDTO);
        productRepository.save(newProduct);
    }
    public List<ProductDTO> getTrendingProduct(){
        List<Product> products = productRepository.findAll();
        List<ProductDTO> dtos = productMapper.toDto(products);
        return dtos.stream().sorted((p1, p2) -> p2.getSold() - p1.getSold()).limit(5).collect(Collectors.toList());
    }
    public List<ProductTypeStatDTO> getProductTypeStat(){
        return productRepository.findProductTypeStats();
    }
}
