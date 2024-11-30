package com.example.demo.API.Mapper;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.example.demo.API.DTO.HeadphoneInfoDTO;
import com.example.demo.API.Entity.HeadphoneInfo;
@Component
public class HeadphoneInfoMapper implements EntityMapper<HeadphoneInfo, HeadphoneInfoDTO> {
    @Override
    public HeadphoneInfo toEntity(HeadphoneInfoDTO dto) {
        return HeadphoneInfo.builder()
                .id(dto.getId())
                .productID(dto.getProductID())
                .headphone_type(dto.getHeadphone_type())
                .speaker_size(dto.getSpeaker_size())
                .speaker_sensitivity(dto.getSpeaker_sensitivity())
                .speaker_impedance(dto.getSpeaker_impedance())
                .microphone_sensitivity(dto.getMicrophone_sensitivity())
                .microphone_frequency_range(dto.getMicrophone_frequency_range())
                .build();
    }

    @Override
    public HeadphoneInfoDTO toDto(HeadphoneInfo entity) {
        return HeadphoneInfoDTO.builder()
                .id(entity.getId())
                .productID(entity.getProductID())
                .headphone_type(entity.getHeadphone_type())
                .speaker_size(entity.getSpeaker_size())
                .speaker_sensitivity(entity.getSpeaker_sensitivity())  
                .speaker_impedance(entity.getSpeaker_impedance())
                .microphone_sensitivity(entity.getMicrophone_sensitivity())
                .microphone_frequency_range(entity.getMicrophone_frequency_range())
                .build();
    }

    @Override
    public List<HeadphoneInfo> toEntity(List<HeadphoneInfoDTO> dto) {
        List<HeadphoneInfo> list = new ArrayList<>();
        for (HeadphoneInfoDTO item : dto) {
            list.add(toEntity(item));
        }
        return list;
    }

    @Override
    public List<HeadphoneInfoDTO> toDto(List<HeadphoneInfo> entity) {
        List<HeadphoneInfoDTO> list = new ArrayList<>();
        for (HeadphoneInfo item : entity) {
            list.add(toDto(item));
        }
        return list;
    }
}
