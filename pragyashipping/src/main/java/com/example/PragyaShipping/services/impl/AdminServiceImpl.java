package com.example.PragyaShipping.services.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.PragyaShipping.entity.Admin;
import com.example.PragyaShipping.repository.AdminRepository;
import com.example.PragyaShipping.services.AdminService;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminRepository adminrepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private void validatePasswordComplexity(String password) {
        if (password == null || password.length() < 8) {
            throw new RuntimeException("Password must be at least 8 characters long");
        }
        if (password.length() > 64) {
            throw new RuntimeException("Password cannot exceed 64 characters");
        }
        boolean hasUpper = false;
        boolean hasLower = false;
        boolean hasDigit = false;
        boolean hasSpecial = false;

        for (char c : password.toCharArray()) {
            if (Character.isUpperCase(c)) hasUpper = true;
            else if (Character.isLowerCase(c)) hasLower = true;
            else if (Character.isDigit(c)) hasDigit = true;
            else hasSpecial = true;
        }

        if (!hasUpper || !hasLower || !hasDigit || !hasSpecial) {
            throw new RuntimeException("Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character");
        }
    }

    @Override
    public Admin saveAdmin(Admin admin) {
        if (admin.getUsername() == null || admin.getUsername().trim().isEmpty()) {
            throw new RuntimeException("Username is required");
        }
        if (admin.getEmail() == null || admin.getEmail().trim().isEmpty()) {
            throw new RuntimeException("Email is required");
        }
        if (adminrepo.findByEmail(admin.getEmail().trim().toLowerCase()).isPresent()) {
            throw new RuntimeException("An admin with this email already exists");
        }

        if (admin.getPassword() == null || admin.getPassword().isBlank()) {
            throw new RuntimeException("Password is required");
        }

        validatePasswordComplexity(admin.getPassword());

        admin.setEmail(admin.getEmail().trim().toLowerCase());
        admin.setUsername(admin.getUsername().trim());
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));

        if (admin.getRole() == null || admin.getRole().isBlank()) {
            admin.setRole("ADMIN");
        }

        return adminrepo.save(admin);
    }

    @Override
    public List<Admin> getAllAdmin() {
        return adminrepo.findAll();
    }

    @Override
    public Optional<Admin> getAdminByid(Long id) {
        return adminrepo.findById(id);
    }

    @Override
    public Admin updateAdmin(Long id, Admin admin) {
        Admin existingAdmin = adminrepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        if (admin.getUsername() != null && !admin.getUsername().trim().isEmpty()) {
            existingAdmin.setUsername(admin.getUsername().trim());
        }

        if (admin.getEmail() != null && !admin.getEmail().trim().isEmpty()) {
            String newEmail = admin.getEmail().trim().toLowerCase();
            if (!newEmail.equalsIgnoreCase(existingAdmin.getEmail()) && adminrepo.findByEmail(newEmail).isPresent()) {
                throw new RuntimeException("An admin with this email already exists");
            }
            existingAdmin.setEmail(newEmail);
        }

        if (admin.getRole() != null && !admin.getRole().isBlank()) {
            existingAdmin.setRole(admin.getRole());
        }

        if (admin.getPassword() != null && !admin.getPassword().isBlank()) {
            validatePasswordComplexity(admin.getPassword());
            existingAdmin.setPassword(passwordEncoder.encode(admin.getPassword()));
        }

        return adminrepo.save(existingAdmin);
    }

    @Override
    public void deleteAdmin(Long id) {
        if (adminrepo.count() <= 1) {
            throw new RuntimeException("Cannot delete the only remaining admin account");
        }
        adminrepo.deleteById(id);
    }

    @Override
    public Admin loginAdmin(String email, String password) {
        if (email == null || password == null) {
            throw new RuntimeException("Invalid email or password");
        }

        Admin admin = adminrepo.findByEmail(email.trim().toLowerCase())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(password, admin.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        return admin;
    }

    @Override
    public Optional<Admin> findByEmail(String email) {
        if (email == null) return Optional.empty();
        return adminrepo.findByEmail(email.trim().toLowerCase());
    }

    @Override
    public void changePassword(String email, String oldPassword, String newPassword) {
        Admin admin = adminrepo.findByEmail(email.trim().toLowerCase())
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        if (!passwordEncoder.matches(oldPassword, admin.getPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }

        if (passwordEncoder.matches(newPassword, admin.getPassword())) {
            throw new RuntimeException("New password cannot be the same as the current password");
        }

        validatePasswordComplexity(newPassword);

        admin.setPassword(passwordEncoder.encode(newPassword));
        adminrepo.save(admin);
    }
}
