package com.example.demo.API.DTO;



import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class WishlistDTO {
    private String id;
    private String username;
    private String product_id;
}
