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

    @Override
    public Admin saveAdmin(Admin admin) {
        if (admin.getPassword() == null || admin.getPassword().isBlank()) {
            throw new RuntimeException("Password is required");
        }
        if (admin.getPassword().length() < 8) {
            throw new RuntimeException("Password must be at least 8 characters");
        }

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

        existingAdmin.setUsername(admin.getUsername());
        existingAdmin.setEmail(admin.getEmail());

        if (admin.getRole() != null && !admin.getRole().isBlank()) {
            existingAdmin.setRole(admin.getRole());
        }

        if (admin.getPassword() != null && !admin.getPassword().isBlank()) {
            if (admin.getPassword().length() < 8) {
                throw new RuntimeException("Password must be at least 8 characters");
            }
            existingAdmin.setPassword(passwordEncoder.encode(admin.getPassword()));
        }

        return adminrepo.save(existingAdmin);
    }

    @Override
    public void deleteAdmin(Long id) {
        adminrepo.deleteById(id);
    }

    @Override
    public Admin loginAdmin(String email, String password) {
        Admin admin = adminrepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(password, admin.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        return admin;
    }

    @Override
    public Optional<Admin> findByEmail(String email) {
        return adminrepo.findByEmail(email);
    }

    @Override
    public void changePassword(String email, String oldPassword, String newPassword) {
        Admin admin = adminrepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        if (!passwordEncoder.matches(oldPassword, admin.getPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }
        if (newPassword == null || newPassword.length() < 8) {
            throw new RuntimeException("New password must be at least 8 characters");
        }

        admin.setPassword(passwordEncoder.encode(newPassword));
        adminrepo.save(admin);
    }
}
