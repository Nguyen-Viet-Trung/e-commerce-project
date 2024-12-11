package com.example.demo.API.Entity;

import java.util.Collection;
import java.util.Collections;
import java.util.Date;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.example.demo.API.Entity.Token.RefreshToken;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class User implements UserDetails{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "fullname", length = 255)
    private String fullname;

    @Column(name = "username", length = 255, unique = true)
    private String username;

    @Column(name = "password", length = 255)
    private String password;

    @Column(name = "phonenumber", length = 255)
    private String phonenumber;

    @Column(name = "address", length = 255)
    private String address;

    @Column(name = "email", length = 255, unique = true)
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender")
    private Gender gender;

    @CreatedDate
    @Column(name = "created_at")
    private Date createdAt;

    @OneToOne(mappedBy = "user")
    private ForgotPassword forgotPassword;
    public enum Gender {
        Male, Female
    }
    @Override
    public boolean isAccountNonExpired() {
       return true;
    }
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
    @Override
    public boolean isEnabled() {
        return true;
    }

    @OneToOne(mappedBy = "user")
    private RefreshToken refreshToken;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.emptyList(); // Không có quyền cụ thể
    }
}

