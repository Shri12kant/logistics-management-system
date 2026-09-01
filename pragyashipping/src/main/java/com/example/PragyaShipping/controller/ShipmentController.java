package com.example.PragyaShipping.controller;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.PragyaShipping.entity.Shipment;
import com.example.PragyaShipping.security.PublicEndpointRateLimiter;
import com.example.PragyaShipping.service.ShipmentService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/shipment")
public class ShipmentController {

    @Autowired
    private ShipmentService shipmentService;

    @Autowired
    private PublicEndpointRateLimiter rateLimiter;

    private String getClientIp(HttpServletRequest request) {
        String xfHeader = request.getHeader("X-Forwarded-For");
        if (xfHeader != null && !xfHeader.isEmpty()) {
            return xfHeader.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }

    // Create shipment (admin only)
    @PostMapping
    public Shipment createShipment(@RequestBody Shipment shipment) {
        return shipmentService.createShipment(shipment);
    }

    // Track shipment (public — protected by rate limiter, no customer private contact info)
    @GetMapping("/track/{trackingNumber}")
    public Map<String, Object> trackShipment(
            @PathVariable String trackingNumber,
            HttpServletRequest request) {

        String clientIp = getClientIp(request);

        // Rate limit: max 30 tracking lookups per minute per IP
        if (!rateLimiter.allowRequest("tracking", clientIp, 30, 60 * 1000L)) {
            throw new RuntimeException("Too many tracking requests. Please slow down.");
        }

        if (trackingNumber == null || trackingNumber.isBlank()) {
            throw new RuntimeException("Tracking number is required");
        }

        Shipment s = shipmentService.getShipmentByTrackingNumber(trackingNumber.trim());

        Map<String, Object> publicView = new LinkedHashMap<>();
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
    public Shipment updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String status = body.get("status");
        if (status == null || status.isBlank()) {
            throw new RuntimeException("Status is required");
        }
        return shipmentService.updateShipmentStatus(id, status.trim().toUpperCase());
    }

    // Delete shipment (admin only)
    @DeleteMapping("/{id}")
    public Map<String, String> deleteShipment(@PathVariable Long id) {
        shipmentService.deleteShipment(id);
        return Map.of("message", "Deleted Successfully");
    }
}
