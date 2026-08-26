package com.example.PragyaShipping.services;

import java.util.List;
import java.util.Optional;

import com.example.PragyaShipping.entity.Admin;

public interface AdminService {

    Admin saveAdmin(Admin admin);

    List<Admin> getAllAdmin();

    Optional<Admin> getAdminByid(Long id);

    Admin updateAdmin(Long id, Admin admin);

    void deleteAdmin(Long id);

    Admin loginAdmin(String email, String password);

    Optional<Admin> findByEmail(String email);

    void changePassword(String email, String oldPassword, String newPassword);
}
