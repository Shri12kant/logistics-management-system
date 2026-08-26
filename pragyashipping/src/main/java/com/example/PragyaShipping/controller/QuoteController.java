package com.example.PragyaShipping.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/quote")
public class QuoteController {

    @Autowired
    private com.example.PragyaShipping.service.QuoteService quoteService;

    // Calculate quote (public for customers)
    @PostMapping("/calculate")
    public double calculateQuote(@RequestBody QuoteRequest request) {
        return quoteService.calculateQuote(request.getWeight(), request.getServiceType(), request.getDistance());
    }

    // Get service type info (public)
    @GetMapping("/services")
    public String getServiceTypeInfo() {
        return quoteService.getServiceTypeInfo();
    }

    // Quote request DTO
    public static class QuoteRequest {
        private Double weight;
        private String serviceType;
        private Double distance;

        public Double getWeight() { return weight; }
        public void setWeight(Double weight) { this.weight = weight; }

        public String getServiceType() { return serviceType; }
        public void setServiceType(String serviceType) { this.serviceType = serviceType; }

        public Double getDistance() { return distance; }
        public void setDistance(Double distance) { this.distance = distance; }
    }
}
