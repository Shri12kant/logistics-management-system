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
import com.example.PragyaShipping.services.ContactService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    @Autowired
    private ContactService contactservice;


    // ================= CREATE CONTACT =================

    @PostMapping
    public Contact create(@Valid @RequestBody Contact contact) {

        return contactservice.saveContact(contact);
    }


    // ================= GET ALL CONTACTS =================

    @GetMapping
    public List<Contact> getAll() {

        return contactservice.getAllContact();
    }


    // ================= DASHBOARD =================

    @GetMapping("/dashboard")
    public Map<String, Long> getDashboard() {

        Map<String, Long> dashboard = new HashMap<>();

        dashboard.put(
                "totalContacts",
                contactservice.getTotalContacts()
        );

        dashboard.put(
                "newContacts",
                contactservice.getNewContacts()
        );

        dashboard.put(
                "readContacts",
                contactservice.getReadContacts()
        );

        dashboard.put(
                "resolvedContacts",
                contactservice.getResolvedContacts()
        );

        return dashboard;
    }


    // ================= GET CONTACT BY ID =================

    @GetMapping("/{id}")
    public Optional<Contact> getContactById(
            @PathVariable Long id) {

        return contactservice.getContactById(id);
    }


    // ================= DELETE CONTACT =================

    @DeleteMapping("/{id}")
    public String deleteContact(
            @PathVariable Long id) {

        contactservice.deleteContact(id);

        return "Deleted Successfully";
    }


    // ================= UPDATE STATUS =================

    @PatchMapping("/{id}/status")
    public Contact updateStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> request) {

        String status = request.get("status");

        return contactservice.updateStatus(id, status);
    }
}