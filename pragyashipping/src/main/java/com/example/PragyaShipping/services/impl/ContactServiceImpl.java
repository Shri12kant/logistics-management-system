package com.example.PragyaShipping.services.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.PragyaShipping.entity.Contact;
import com.example.PragyaShipping.repository.ContactRepository;
import com.example.PragyaShipping.security.InputSanitizer;
import com.example.PragyaShipping.services.ContactService;

@Service
public class ContactServiceImpl implements ContactService {

    @Autowired
    private ContactRepository contactrepo;

    @Autowired
    private InputSanitizer inputSanitizer;

    // ================= SAVE CONTACT =================

    @Override
    public Contact saveContact(Contact contact) {
        if (contact.getName() != null) {
            contact.setName(inputSanitizer.sanitizeText(contact.getName()));
        }
        if (contact.getEmail() != null) {
            contact.setEmail(inputSanitizer.sanitizeEmail(contact.getEmail()));
        }
        if (contact.getPhoneNumber() != null) {
            contact.setPhoneNumber(inputSanitizer.sanitizePhone(contact.getPhoneNumber()));
        }
        if (contact.getServiceType() != null) {
            contact.setServiceType(inputSanitizer.sanitizeText(contact.getServiceType()));
        }
        if (contact.getMessage() != null) {
            contact.setMessage(inputSanitizer.sanitizeText(contact.getMessage()));
        }

        if (contact.getStatus() == null || contact.getStatus().isBlank()) {
            contact.setStatus("NEW");
        }
        return contactrepo.save(contact);
    }

    // ================= GET ALL CONTACTS =================

    @Override
    public List<Contact> getAllContact() {
        return contactrepo.findAll();
    }

    // ================= GET CONTACT BY ID =================

    @Override
    public Optional<Contact> getContactById(Long id) {
        return contactrepo.findById(id);
    }

    // ================= DELETE CONTACT =================

    @Override
    public void deleteContact(Long id) {
        if (!contactrepo.existsById(id)) {
            throw new RuntimeException("Contact not found");
        }
        contactrepo.deleteById(id);
    }

    // ================= UPDATE STATUS =================

    @Override
    public Contact updateStatus(Long id, String status) {
        Contact contact = contactrepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Contact not found"));

        String normalizedStatus = status != null ? status.trim().toUpperCase() : "";

        if (!normalizedStatus.equals("NEW")
                && !normalizedStatus.equals("READ")
                && !normalizedStatus.equals("RESOLVED")) {
            throw new RuntimeException("Invalid status. Use NEW, READ or RESOLVED");
        }

        contact.setStatus(normalizedStatus);
        return contactrepo.save(contact);
    }

    // ================= DASHBOARD =================

    @Override
    public long getTotalContacts() {
        return contactrepo.count();
    }

    @Override
    public long getNewContacts() {
        return contactrepo.countByStatus("NEW");
    }

    @Override
    public long getReadContacts() {
        return contactrepo.countByStatus("READ");
    }

    @Override
    public long getResolvedContacts() {
        return contactrepo.countByStatus("RESOLVED");
    }
}