package com.example.PragyaShipping.security;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.example.PragyaShipping.entity.Admin;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SecurityException;

@Service
public class JwtService {

    @Value("${app.jwt.secret}")
    private String secretKey;

    private final long EXPIRATION_TIME = 1000L * 60 * 60 * 8; // 8 hours

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(secretKey.getBytes());
    }

    public long getExpirationTime() {
        return EXPIRATION_TIME;
    }

    // Generate JWT token with email + role + username
    public String generateToken(Admin admin) {
        return Jwts.builder()
                .subject(admin.getEmail())
                .claim("role", admin.getRole())
                .claim("username", admin.getUsername())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(getSigningKey())
                .compact();
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    // Extract email from JWT
    public String extractEmail(String token) {
        return extractAllClaims(token).getSubject();
    }

    // Extract role from JWT
    public String extractRole(String token) {
        return extractAllClaims(token).get("role", String.class);
    }

    // Extract username from JWT
    public String extractUsername(String token) {
        return extractAllClaims(token).get("username", String.class);
    }

    // Validate token integrity and expiration
    public boolean isTokenValid(String token) {
        try {
            Claims claims = extractAllClaims(token);
            return claims.getExpiration().after(new Date());
        } catch (SecurityException | MalformedJwtException | ExpiredJwtException | IllegalArgumentException e) {
            return false;
        }
    }
}
