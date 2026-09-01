package com.example.PragyaShipping.security;

import org.springframework.stereotype.Component;

@Component
public class InputSanitizer {

    /**
     * Sanitizes plain text by removing HTML tags and preventing CSV/Excel formula injection.
     */
    public String sanitizeText(String input) {
        if (input == null) return null;

        // 1. Strip HTML tags to prevent stored XSS
        String sanitized = input.replaceAll("<[^>]*>", "");

        // 2. Prevent CSV / Excel Formula Injection (if text begins with formula characters)
        if (!sanitized.isEmpty()) {
            char first = sanitized.charAt(0);
            if (first == '=' || first == '+' || first == '-' || first == '@' || first == '\t' || first == '\r') {
                sanitized = "'" + sanitized;
            }
        }

        return sanitized.trim();
    }

    /**
     * Sanitizes email addresses (lowercased, trimmed, basic character filter).
     */
    public String sanitizeEmail(String email) {
        if (email == null) return null;
        return email.trim().toLowerCase().replaceAll("[^a-z0-9@._+-]", "");
    }

    /**
     * Sanitizes phone numbers (keeps only digits, plus, and dashes).
     */
    public String sanitizePhone(String phone) {
        if (phone == null) return null;
        return phone.trim().replaceAll("[^0-9+ -]", "");
    }
}
