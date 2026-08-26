package com.example.PragyaShipping.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.example.PragyaShipping.entity.Admin;
import com.example.PragyaShipping.security.JwtService;
import com.example.PragyaShipping.services.AdminService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminservice;

    @Autowired
    private JwtService jwtService;

    @PostMapping
    public Admin create(@RequestBody Admin admin) {
        return adminservice.saveAdmin(admin);
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
    public String delete(@PathVariable Long id) {
        adminservice.deleteAdmin(id);
        return "Deleted Successfully";
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Admin admin) {
        try {
            Admin loggedInAdmin = adminservice.loginAdmin(
                    admin.getEmail(),
                    admin.getPassword()
            );
            String token = jwtService.generateToken(loggedInAdmin);
            return ResponseEntity.ok(Map.of("token", token));
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(Map.of("message", "Invalid email or password"));
        }
    }

    @PostMapping("/change-password")
    public ResponseEntity<Map<String, String>> changePassword(
            Authentication authentication,
            @RequestBody Map<String, String> body) {

        String email = authentication.getName();
        String oldPassword = body.get("oldPassword");
        String newPassword = body.get("newPassword");

        if (oldPassword == null || newPassword == null) {
            throw new RuntimeException("oldPassword and newPassword are required");
        }

        adminservice.changePassword(email, oldPassword, newPassword);
        return ResponseEntity.ok(Map.of("message", "Password changed successfully"));
    }
}
