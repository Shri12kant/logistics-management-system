package com.example.PragyaShipping.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.PragyaShipping.entity.Contact;

@Repository
public interface ContactRepository extends JpaRepository<Contact,Long > {
	long countByStatus(String status);

}
