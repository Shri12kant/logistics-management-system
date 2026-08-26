package com.example.PragyaShipping.services;

import java.util.List;
import java.util.Optional;

import com.example.PragyaShipping.entity.Contact;

public interface ContactService {

    Contact saveContact(Contact contact);

    List<Contact> getAllContact();

    Optional<Contact> getContactById(Long id);

    void deleteContact(Long id);
    
    Contact updateStatus(Long id, String status);
    
//    Dashboard counts
    
    long getTotalContacts();
    
    long getNewContacts();
    
    long getReadContacts();
    
   
    
    long getResolvedContacts();
}