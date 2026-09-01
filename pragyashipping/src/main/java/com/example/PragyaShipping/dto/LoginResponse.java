package com.example.PragyaShipping.dto;

public class LoginResponse {

    private String token;
    private String email;
    private String username;
    private String role;
    private long expiresInMs;

    public LoginResponse() {
    }

    public LoginResponse(String token, String email, String username, String role, long expiresInMs) {
        this.token = token;
        this.email = email;
        this.username = username;
        this.role = role;
        this.expiresInMs = expiresInMs;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public long getExpiresInMs() {
        return expiresInMs;
    }

    public void setExpiresInMs(long expiresInMs) {
        this.expiresInMs = expiresInMs;
    }
}
