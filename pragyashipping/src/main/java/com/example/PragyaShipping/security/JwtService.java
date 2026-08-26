package com.example.PragyaShipping.security;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.example.PragyaShipping.entity.Admin;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    @Value("${app.jwt.secret}")
    private String secretKey;

    private final long EXPIRATION_TIME = 1000L * 60 * 60 * 8; // 8 hours

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(secretKey.getBytes());
    }

    // Generate JWT token with email + role
    public String generateToken(Admin admin) {

        return Jwts.builder()

                .subject(admin.getEmail())

                .claim("role", admin.getRole())

                .issuedAt(new Date())

                .expiration(new Date(
                        System.currentTimeMillis() + EXPIRATION_TIME
                ))

                .signWith(getSigningKey())

                .compact();
    }

    // Extract email from JWT
    public String extractEmail(String token) {

        return Jwts.parser()

                .verifyWith(getSigningKey())

                .build()

                .parseSignedClaims(token)

                .getPayload()

                .getSubject();
    }

    // Extract role from JWT
    public String extractRole(String token) {

        return Jwts.parser()

                .verifyWith(getSigningKey())

                .build()

                .parseSignedClaims(token)

                .getPayload()

                .get("role", String.class);
    }
}
