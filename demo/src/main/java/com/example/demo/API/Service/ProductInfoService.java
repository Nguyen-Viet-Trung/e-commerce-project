package com.example.demo.API.Service;
import java.util.List;
import java.util.stream.Collectors;

import com.example.demo.API.DTO.ProductInfoDTO;
import com.example.demo.API.Entity.ProductInfo;
import com.example.demo.API.Mapper.ProductInfoMapper;
import com.example.demo.API.Repository.ProductInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
@Service
@RequiredArgsConstructor
public class ProductInfoService {
    private final ProductInfoRepository productInfoRepository;
    private final ProductInfoMapper productInfoMapper;

    public List<ProductInfoDTO> findAll() {
        List<ProductInfo> productInfos = productInfoRepository.findAll();
        return productInfoMapper.toDto(productInfos);
    }
    public void save(ProductInfoDTO productInfoDTO) {
        ProductInfo productInfo = productInfoMapper.toEntity(productInfoDTO);
        productInfoRepository.save(productInfo);
    }
    public ProductInfoDTO findByProductID(String productID) {
        List<ProductInfo> productInfos = productInfoRepository.findAll();
        ProductInfo response = productInfos.stream().filter(item -> item.getProductID().equals(productID)).findFirst().orElse(null);
        return productInfoMapper.toDto(response);
    }
    public void updateInfo(ProductInfoDTO productInfoDTO, String productID) {
        List<ProductInfo> productInfos = productInfoRepository.findAll();
        productInfos = productInfos.stream().map(
            item -> {
                if(item.getProductID().equals(productID)){
                    item.setCPU(productInfoDTO.getCPU());
                    item.setRAM(productInfoDTO.getRAM());
                    item.setHardDrive(productInfoDTO.getHardDrive());
                    item.setGPU(productInfoDTO.getGPU());
                    item.setDisplay(productInfoDTO.getDisplay());
                    item.setBattery(productInfoDTO.getBattery());
                }
                return item;
            }
        ).collect(Collectors.toList());

        productInfoRepository.saveAll(productInfos);
    }
}
