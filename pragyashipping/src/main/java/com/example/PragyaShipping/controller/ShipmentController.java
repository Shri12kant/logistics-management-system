package com.example.PragyaShipping.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.PragyaShipping.entity.Shipment;
import com.example.PragyaShipping.service.ShipmentService;

@RestController
@RequestMapping("/api/shipment")
public class ShipmentController {

    @Autowired
    private ShipmentService shipmentService;

    // Create shipment (admin only)
    @PostMapping
    public Shipment createShipment(@RequestBody Shipment shipment) {
        return shipmentService.createShipment(shipment);
    }

    // Track shipment (public — no customer contact details)
    @GetMapping("/track/{trackingNumber}")
    public java.util.Map<String, Object> trackShipment(@PathVariable String trackingNumber) {
        Shipment s = shipmentService.getShipmentByTrackingNumber(trackingNumber);
        java.util.Map<String, Object> publicView = new java.util.LinkedHashMap<>();
        publicView.put("trackingNumber", s.getTrackingNumber());
        publicView.put("status", s.getStatus());
        publicView.put("serviceType", s.getServiceType());
        publicView.put("weight", s.getWeight());
        publicView.put("pickupAddress", s.getPickupAddress());
        publicView.put("deliveryAddress", s.getDeliveryAddress());
        publicView.put("createdAt", s.getCreatedAt());
        publicView.put("estimatedDelivery", s.getEstimatedDelivery());
        publicView.put("actualDelivery", s.getActualDelivery());
        publicView.put("paymentStatus", s.getPaymentStatus());
        return publicView;
    }

    // Get all shipments (admin only)
    @GetMapping
    public List<Shipment> getAllShipments() {
        return shipmentService.getAllShipments();
    }

    // Update shipment status (admin only)
    @PatchMapping("/{id}/status")
    public Shipment updateStatus(@PathVariable Long id, @RequestBody java.util.Map<String, String> body) {
        String status = body.get("status");
        if (status == null || status.isBlank()) {
            throw new RuntimeException("Status is required");
        }
        return shipmentService.updateShipmentStatus(id, status.trim().toUpperCase());
    }

    // Delete shipment (admin only)
    @DeleteMapping("/{id}")
    public void deleteShipment(@PathVariable Long id) {
        shipmentService.deleteShipment(id);
    }
}
