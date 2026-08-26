package com.example.PragyaShipping.service;

import org.springframework.stereotype.Service;

@Service
public class QuoteService {

    // Base rates per kg for different service types
    private static final double STANDARD_RATE = 50.0;  // per kg
    private static final double EXPRESS_RATE = 80.0;   // per kg
    private static final double PREMIUM_RATE = 120.0;   // per kg

    // Distance multiplier (simplified - in production use actual distance calculation)
    private static final double BASE_DISTANCE = 100.0;  // km
    private static final double DISTANCE_MULTIPLIER = 1.5;

    // Calculate shipping quote
    public double calculateQuote(Double weight, String serviceType, Double distance) {
        if (weight == null || weight <= 0) {
            throw new RuntimeException("Invalid weight");
        }

        if (serviceType == null) {
            serviceType = "STANDARD";
        }

        // Calculate base cost based on weight and service type
        double baseCost = weight * getRateByServiceType(serviceType);

        // Add distance factor
        double distanceFactor = (distance != null && distance > BASE_DISTANCE) 
                ? (distance - BASE_DISTANCE) * DISTANCE_MULTIPLIER 
                : 0;

        // Total quote
        double totalQuote = baseCost + distanceFactor;

        // Minimum charge
        return Math.max(totalQuote, 200.0);  // Minimum ₹200
    }

    private double getRateByServiceType(String serviceType) {
        switch (serviceType.toUpperCase()) {
            case "EXPRESS":
                return EXPRESS_RATE;
            case "PREMIUM":
                return PREMIUM_RATE;
            case "STANDARD":
            default:
                return STANDARD_RATE;
        }
    }

    // Get service types and their rates
    public String getServiceTypeInfo() {
        return "STANDARD: ₹" + STANDARD_RATE + "/kg, EXPRESS: ₹" + EXPRESS_RATE + "/kg, PREMIUM: ₹" + PREMIUM_RATE + "/kg";
    }
}
