package com.example.PragyaShipping.service;

import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.PragyaShipping.entity.Shipment;
import com.example.PragyaShipping.repository.ShipmentRepository;

@Service
public class ShipmentService {

    @Autowired
    private ShipmentRepository shipmentRepository;

    // Generate unique tracking number
    private String generateTrackingNumber() {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder trackingNumber = new StringBuilder();
        Random random = new Random();

        for (int i = 0; i < 10; i++) {
            trackingNumber.append(chars.charAt(random.nextInt(chars.length())));
        }

        return "PRG" + trackingNumber.toString();
    }

    // Create new shipment
    public Shipment createShipment(Shipment shipment) {
        String trackingNumber;
        do {
            trackingNumber = generateTrackingNumber();
        } while (shipmentRepository.existsByTrackingNumber(trackingNumber));

        shipment.setTrackingNumber(trackingNumber);
        if (shipment.getPaymentStatus() == null || shipment.getPaymentStatus().isBlank()) {
            shipment.setPaymentStatus("UNPAID");
        }
        return shipmentRepository.save(shipment);
    }

    // Get shipment by tracking number
    public Shipment getShipmentByTrackingNumber(String trackingNumber) {
        return shipmentRepository.findByTrackingNumber(trackingNumber)
                .orElseThrow(() -> new RuntimeException("Shipment not found"));
    }

    // Get all shipments
    public List<Shipment> getAllShipments() {
        return shipmentRepository.findAll();
    }

    // Update shipment status
    public Shipment updateShipmentStatus(Long id, String status) {
        Shipment shipment = shipmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Shipment not found"));
        shipment.setStatus(status);
        
        if (status.equals("DELIVERED")) {
            shipment.setActualDelivery(java.time.LocalDateTime.now());
        }
        
        return shipmentRepository.save(shipment);
    }

    // Delete shipment
    public void deleteShipment(Long id) {
        shipmentRepository.deleteById(id);
    }
}
