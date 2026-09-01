package com.example.PragyaShipping.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.PragyaShipping.entity.QuoteSettings;
import com.example.PragyaShipping.repository.QuoteSettingsRepository;

@Service
public class QuoteService {

    @Autowired
    private QuoteSettingsRepository quoteSettingsRepository;

    public QuoteSettings getSettings() {
        return quoteSettingsRepository.findById(1L).orElseGet(() -> {
            QuoteSettings defaults = new QuoteSettings();
            defaults.setId(1L);
            return quoteSettingsRepository.save(defaults);
        });
    }

    public QuoteSettings updateSettings(QuoteSettings incoming) {
        QuoteSettings settings = getSettings();
        if (incoming.getStandardRate() != null && incoming.getStandardRate() > 0) settings.setStandardRate(incoming.getStandardRate());
        if (incoming.getExpressRate() != null && incoming.getExpressRate() > 0) settings.setExpressRate(incoming.getExpressRate());
        if (incoming.getPremiumRate() != null && incoming.getPremiumRate() > 0) settings.setPremiumRate(incoming.getPremiumRate());
        if (incoming.getMinimumCharge() != null && incoming.getMinimumCharge() > 0) settings.setMinimumCharge(incoming.getMinimumCharge());
        if (incoming.getBaseDistanceKm() != null && incoming.getBaseDistanceKm() >= 0) settings.setBaseDistanceKm(incoming.getBaseDistanceKm());
        if (incoming.getExtraPerKm() != null && incoming.getExtraPerKm() >= 0) settings.setExtraPerKm(incoming.getExtraPerKm());
        return quoteSettingsRepository.save(settings);
    }

    public double calculateQuote(Double weight, String serviceType, Double distance) {
        if (weight == null || weight <= 0) {
            throw new RuntimeException("Weight must be greater than 0 kg");
        }
        if (weight > 50000) {
            throw new RuntimeException("For cargo exceeding 50,000 kg (50 tons), please contact us directly for custom freight rates");
        }
        if (distance != null) {
            if (distance < 0) {
                throw new RuntimeException("Distance cannot be negative");
            }
            if (distance > 10000) {
                throw new RuntimeException("Distance exceeds maximum supported route distance (10,000 km)");
            }
        }

        QuoteSettings settings = getSettings();
        if (serviceType == null || serviceType.isBlank()) {
            serviceType = "STANDARD";
        }

        double baseCost = weight * getRateByServiceType(serviceType, settings);

        double extraKm = 0;
        if (distance != null && distance > settings.getBaseDistanceKm()) {
            extraKm = (distance - settings.getBaseDistanceKm()) * settings.getExtraPerKm();
        }

        double total = Math.max(baseCost + extraKm, settings.getMinimumCharge());
        return Math.round(total * 100.0) / 100.0;
    }

    private double getRateByServiceType(String serviceType, QuoteSettings settings) {
        switch (serviceType.toUpperCase()) {
            case "EXPRESS":
                return settings.getExpressRate();
            case "PREMIUM":
                return settings.getPremiumRate();
            case "STANDARD":
            default:
                return settings.getStandardRate();
        }
    }
}
