package com.example.PragyaShipping.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.PragyaShipping.dto.ChangePasswordRequest;
import com.example.PragyaShipping.dto.LoginRequest;
import com.example.PragyaShipping.dto.LoginResponse;
import com.example.PragyaShipping.entity.Admin;
import com.example.PragyaShipping.security.JwtService;
import com.example.PragyaShipping.security.LoginRateLimiterService;
import com.example.PragyaShipping.services.AdminService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminservice;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private LoginRateLimiterService rateLimiterService;

    private String getClientIp(HttpServletRequest request) {
        String xfHeader = request.getHeader("X-Forwarded-For");
        if (xfHeader != null && !xfHeader.isEmpty()) {
            return xfHeader.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }

    @PostMapping
    public ResponseEntity<Admin> create(@RequestBody Admin admin) {
        return ResponseEntity.status(HttpStatus.CREATED).body(adminservice.saveAdmin(admin));
    }

    @GetMapping
    public List<Admin> getall() {
        return adminservice.getAllAdmin();
    }

    @GetMapping("/{id}")
    public Optional<Admin> getById(@PathVariable Long id) {
        return adminservice.getAdminByid(id);
    }

    @PutMapping("/{id}")
    public Admin update(@PathVariable Long id, @RequestBody Admin admin) {
        return adminservice.updateAdmin(id, admin);
    }

    @DeleteMapping("/{id}")
    public Map<String, String> delete(@PathVariable Long id) {
        adminservice.deleteAdmin(id);
        return Map.of("message", "Deleted Successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @Valid @RequestBody LoginRequest loginRequest,
            HttpServletRequest request) {

        String clientIp = getClientIp(request);
        String email = loginRequest.getEmail().trim().toLowerCase();
        String rateLimitKey = clientIp + ":" + email;

        // 1. Check if the IP / Email combination is locked
        if (rateLimiterService.isBlocked(rateLimitKey)) {
            long remainingSeconds = rateLimiterService.getRemainingLockoutSeconds(rateLimitKey);
            long minutes = (remainingSeconds + 59) / 60;
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body(
                    Map.of("message", "Account is temporarily locked due to multiple failed login attempts. Please try again in " + minutes + " minute(s).")
            );
        }

        try {
            // 2. Attempt authentication
            Admin loggedInAdmin = adminservice.loginAdmin(email, loginRequest.getPassword());

            // 3. Successful login -> reset rate limiter
            rateLimiterService.resetAttempts(rateLimitKey);

            String token = jwtService.generateToken(loggedInAdmin);
            LoginResponse response = new LoginResponse(
                    token,
                    loggedInAdmin.getEmail(),
                    loggedInAdmin.getUsername(),
                    loggedInAdmin.getRole(),
                    jwtService.getExpirationTime()
            );

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            // 4. Failed login -> increment failed attempt count
            rateLimiterService.recordFailedAttempt(rateLimitKey);
            int remainingAttempts = rateLimiterService.getRemainingAttempts(rateLimitKey);

            if (rateLimiterService.isBlocked(rateLimitKey)) {
                return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body(
                        Map.of("message", "Too many failed attempts. Your account has been temporarily locked for 15 minutes.")
                );
            }

            String failureMessage = "Invalid email or password. " + remainingAttempts + " attempt(s) remaining before temporary lockout.";
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    Map.of("message", failureMessage)
            );
        }
    }

    @PostMapping("/change-password")
    public ResponseEntity<Map<String, String>> changePassword(
            Authentication authentication,
            @Valid @RequestBody ChangePasswordRequest request) {

        String email = authentication.getName();
        adminservice.changePassword(email, request.getOldPassword(), request.getNewPassword());
        return ResponseEntity.ok(Map.of("message", "Password changed successfully"));
    }

    @GetMapping("/me")
    public ResponseEntity<?> getMe(Authentication authentication) {
        String email = authentication.getName();
        return adminservice.findByEmail(email)
                .map(admin -> ResponseEntity.ok(Map.of(
                        "username", admin.getUsername(),
                        "email", admin.getEmail(),
                        "role", admin.getRole()
                )))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }
}
