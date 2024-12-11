package com.example.demo.API.Controller;

import java.time.Instant;
import java.util.Date;
import java.util.Objects;
import java.util.Random;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.API.DTO.MailBody;
import com.example.demo.API.Entity.ForgotPassword;
import com.example.demo.API.Entity.User;
import com.example.demo.API.Repository.ForgotPasswordRepository;
import com.example.demo.API.Repository.UserRepository;
import com.example.demo.API.Service.EmailService;
import com.example.demo.API.utils.ChangePassword;

@RestController
@RequestMapping("/forgotPassword")
public class ForgotPasswordController {
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final ForgotPasswordRepository forgotPasswordRepository;
    private final PasswordEncoder passwordEncoder;
    public ForgotPasswordController(UserRepository userRepository, EmailService emailService, ForgotPasswordRepository forgotPasswordRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.emailService = emailService;
        this.forgotPasswordRepository = forgotPasswordRepository;
        this.passwordEncoder = passwordEncoder;
    }
    @PostMapping("/verifyEmail/{email}")
    public ResponseEntity<String> verifyEmail(@PathVariable String email) {
        User user = userRepository.findByEmail(email)
        .orElseThrow(() -> new IllegalArgumentException("User not found."));
        
        forgotPasswordRepository.deleteByUser(user);

        Integer otp = otpGenerator();
        MailBody mailBody = MailBody.builder()
        .to(email)
        .text("This is the OTP for your forgot password request in Trung Tech: " + otp + "\n" +"Please note, the OTP is valid only for the next 5 minutes.")
        .subject("OTP for forgot password")
        .build();

        ForgotPassword forgotPassword = ForgotPassword.builder()
        .otp(otp)
        .expirationTime(new Date(System.currentTimeMillis() +  300 * 1000))
        .user(user)
        .build();

        emailService.sendSimpleMessage(mailBody);
        forgotPasswordRepository.save(forgotPassword);

        return ResponseEntity.ok("OTP sent successfully.");
    }
    @PostMapping("/verifyOTP/{otp}/{email}")
    public ResponseEntity<String> verifyOTP(@PathVariable int otp, @PathVariable String email) {
        User user = userRepository.findByEmail(email)
        .orElseThrow(() -> new IllegalArgumentException("User not found."));

        ForgotPassword fp = forgotPasswordRepository.findByOtpAndUser(otp, user).orElseThrow(() -> new IllegalArgumentException("Invalid OTP for email: "+email));
        if(fp.getExpirationTime().before(Date.from(Instant.now()))){
            forgotPasswordRepository.deleteById(fp.getFpid());
            return new ResponseEntity<>("OTP expired", HttpStatus.EXPECTATION_FAILED);  
        }
        return ResponseEntity.ok("OTP verified");
    }
    @PostMapping("/changePassword/{email}")
    public ResponseEntity<String> changePasswordHandler(@PathVariable String email, @RequestBody ChangePassword changePassword) {
        if(!Objects.equals(changePassword.password(), changePassword.repeatPassword())){
            return new ResponseEntity<>("Please enter the password right", HttpStatus.EXPECTATION_FAILED);
        }
        userRepository.updatePassword(passwordEncoder.encode(changePassword.password()), email);
        return ResponseEntity.ok("Password changed successfully");
    }
    private Integer otpGenerator(){
        Random random = new Random();
        return random.nextInt(100000, 999999);
    }
}
