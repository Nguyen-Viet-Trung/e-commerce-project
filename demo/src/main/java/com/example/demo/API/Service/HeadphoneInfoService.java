package com.example.demo.API.Service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.demo.API.DTO.HeadphoneInfoDTO;
import com.example.demo.API.Entity.HeadphoneInfo;
import com.example.demo.API.Mapper.HeadphoneInfoMapper;
import com.example.demo.API.Repository.HeadphoneInfoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HeadphoneInfoService {
    private final HeadphoneInfoRepository headphoneInfoRepository;
    private final HeadphoneInfoMapper headphoneInfoMapper;

    public List<HeadphoneInfoDTO> findAll() {
        List<HeadphoneInfo> headphoneInfos = headphoneInfoRepository.findAll();
        return headphoneInfoMapper.toDto(headphoneInfos);
    }
    public void save(HeadphoneInfoDTO headphoneInfoDTO) {
        HeadphoneInfo headphoneInfo = headphoneInfoMapper.toEntity(headphoneInfoDTO);
        headphoneInfoRepository.save(headphoneInfo);
    }
    public HeadphoneInfoDTO findByProductID(String productID) {
        List<HeadphoneInfo> headphoneInfos = headphoneInfoRepository.findAll();
        HeadphoneInfo response = headphoneInfos.stream().filter(item -> item.getProductID().equals(productID)).findFirst().orElse(null);
        return headphoneInfoMapper.toDto(response);
    }
    public void updateInfo(HeadphoneInfoDTO headphoneInfoDTO, String productID) {
        List<HeadphoneInfo> headphoneInfos = headphoneInfoRepository.findAll();
        headphoneInfos = headphoneInfos.stream().map(
            item -> {
                if(item.getProductID().equals(productID)){
                    item.setHeadphone_type(headphoneInfoDTO.getHeadphone_type());
                    item.setMicrophone_frequency_range(headphoneInfoDTO.getMicrophone_frequency_range());
                    item.setSpeaker_impedance(headphoneInfoDTO.getSpeaker_impedance());
                    item.setSpeaker_sensitivity(headphoneInfoDTO.getSpeaker_sensitivity());
                    item.setSpeaker_size(headphoneInfoDTO.getSpeaker_size());
                    item.setMicrophone_sensitivity(headphoneInfoDTO.getMicrophone_sensitivity());
                }
                return item;
            }
        ).collect(Collectors.toList());

        headphoneInfoRepository.saveAll(headphoneInfos);
        }
}
