package com.example.PragyaShipping.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.PragyaShipping.entity.Contact;
import com.example.PragyaShipping.security.PublicEndpointRateLimiter;
import com.example.PragyaShipping.services.ContactService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    @Autowired
    private ContactService contactservice;

    @Autowired
    private PublicEndpointRateLimiter rateLimiter;

    private String getClientIp(HttpServletRequest request) {
        String xfHeader = request.getHeader("X-Forwarded-For");
        if (xfHeader != null && !xfHeader.isEmpty()) {
            return xfHeader.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }

    // ================= CREATE CONTACT (PUBLIC WITH RATE LIMITING) =================

    @PostMapping
    public Contact create(@Valid @RequestBody Contact contact, HttpServletRequest request) {
        String clientIp = getClientIp(request);

        // Limit: Max 5 contact submissions per 10 minutes per IP
        if (!rateLimiter.allowRequest("contact", clientIp, 5, 10 * 60 * 1000L)) {
            throw new RuntimeException("Too many contact submissions. Please wait a few minutes before submitting again.");
        }

        return contactservice.saveContact(contact);
    }

    // ================= GET ALL CONTACTS (ADMIN ONLY) =================

    @GetMapping
    public List<Contact> getAll() {
        return contactservice.getAllContact();
    }

    // ================= DASHBOARD STATS (ADMIN ONLY) =================

    @GetMapping("/dashboard")
    public Map<String, Long> getDashboard() {
        Map<String, Long> dashboard = new HashMap<>();
        dashboard.put("totalContacts", contactservice.getTotalContacts());
        dashboard.put("newContacts", contactservice.getNewContacts());
        dashboard.put("readContacts", contactservice.getReadContacts());
        dashboard.put("resolvedContacts", contactservice.getResolvedContacts());
        return dashboard;
    }

    // ================= GET CONTACT BY ID (ADMIN ONLY) =================

    @GetMapping("/{id}")
    public Optional<Contact> getContactById(@PathVariable Long id) {
        return contactservice.getContactById(id);
    }

    // ================= DELETE CONTACT (ADMIN ONLY) =================

    @DeleteMapping("/{id}")
    public Map<String, String> deleteContact(@PathVariable Long id) {
        contactservice.deleteContact(id);
        return Map.of("message", "Deleted Successfully");
    }

    // ================= UPDATE STATUS (ADMIN ONLY) =================

    @PatchMapping("/{id}/status")
    public Contact updateStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> request) {

        String status = request.get("status");
        return contactservice.updateStatus(id, status);
    }
}