package com.example.demo.PayOS_Checkout.Controller;

import org.springframework.stereotype.Controller;

import vn.payos.PayOS;
import vn.payos.type.CheckoutResponseData;
import vn.payos.type.ItemData;
import vn.payos.type.PaymentData;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Date;

import org.springframework.http.MediaType;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;




@Controller

public class CheckoutController {
    private final PayOS payOS;
    public CheckoutController(PayOS payOS){
        super();
        this.payOS = payOS;
    }

    @RequestMapping(value = "/")
    public String index() {
        return "redirect:http://localhost:3000/";
    }
    @RequestMapping(value = "/successful")
    public String successful() {
        // Giả sử paymentStatus là success khi thanh toán thành công
        String paymentStatus = "success";
        return "redirect:http://localhost:3000/successful?paymentStatus=" + paymentStatus;
    }
    
    @RequestMapping(value = "/cancel")
    public String cancel() {
        // Giả sử paymentStatus là cancel khi thanh toán bị hủy
        String paymentStatus = "cancel";
        return "redirect:http://localhost:3000/cancel?paymentStatus=" + paymentStatus;
    }
    
    @RequestMapping(method = RequestMethod.POST, value = "/create-payment-link",consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public void Checkout(HttpServletRequest request, HttpServletResponse response, @RequestParam("price") int price){
        try{
            final String baseUrl = getBaseUrl(request);
            final String productName = "Sản phẩm Trung Tech";
            final String description = "Trung Tech";
            final String returnUrl = baseUrl + "/successful";
            final String cancelUrl = baseUrl + "/cancel";
            // Gen order code
            String currentTimeString = String.valueOf(new Date().getTime());
            long orderCode = Long.parseLong(currentTimeString.substring(currentTimeString.length() - 6));
            ItemData item = ItemData.builder().name(productName).quantity(1).price(price).build();
            PaymentData paymentData = PaymentData.builder().orderCode(orderCode).amount(price).description(description)
                    .returnUrl(returnUrl).cancelUrl(cancelUrl).item(item).build();
            CheckoutResponseData data = payOS.createPaymentLink(paymentData);

            String checkoutUrl = data.getCheckoutUrl();
            response.setContentType("application/json");
            response.getWriter().write("{\"checkoutUrl\":\"" + checkoutUrl + "\"}");
            response.setStatus(200); // OK status
        }catch(Exception e){
            e.printStackTrace();
        }
    }

    private String getBaseUrl(HttpServletRequest request){
        String scheme = request.getScheme();
        String serverName = request.getServerName();
        int serverPort = request.getServerPort();
        String contextPath = request.getContextPath();

        String url = scheme + "://" + serverName;
        if ((scheme.equals("http") && serverPort != 80) || (scheme.equals("https") && serverPort != 443)) {
            url += ":" + serverPort;
        }
        url += contextPath;
        return url;
    }
    
}
