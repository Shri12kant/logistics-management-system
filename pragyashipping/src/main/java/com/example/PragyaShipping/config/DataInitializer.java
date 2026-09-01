package com.example.PragyaShipping.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.example.PragyaShipping.entity.Admin;
import com.example.PragyaShipping.entity.QuoteSettings;
import com.example.PragyaShipping.repository.AdminRepository;
import com.example.PragyaShipping.repository.QuoteSettingsRepository;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private QuoteSettingsRepository quoteSettingsRepository;

    @Override
    public void run(String... args) throws Exception {
        if (quoteSettingsRepository.findById(1L).isEmpty()) {
            QuoteSettings settings = new QuoteSettings();
            settings.setId(1L);
            quoteSettingsRepository.save(settings);
        }

        if (adminRepository.findByEmail("admin@pragyashipping.com").isPresent()
                || adminRepository.count() > 0) {
            return;
        }

        Admin admin = new Admin();
        admin.setUsername("admin");
        admin.setEmail("admin@pragyashipping.com");
        admin.setPassword(passwordEncoder.encode("Pragya@Admin2026!Secure"));
        admin.setRole("ADMIN");
        adminRepository.save(admin);
    }
}
