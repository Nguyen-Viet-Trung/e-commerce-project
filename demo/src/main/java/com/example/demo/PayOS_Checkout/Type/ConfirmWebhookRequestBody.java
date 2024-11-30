package com.example.demo.PayOS_Checkout.Type;
import lombok.*;
@Getter
@Setter
public class ConfirmWebhookRequestBody {
    private String webhookUrl;

    public ConfirmWebhookRequestBody(String webhookUrl){
        this.webhookUrl = webhookUrl;
    }
}
