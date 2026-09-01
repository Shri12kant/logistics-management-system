package com.example.PragyaShipping.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.PragyaShipping.entity.QuoteSettings;
import com.example.PragyaShipping.security.PublicEndpointRateLimiter;
import com.example.PragyaShipping.service.QuoteService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/quote")
public class QuoteController {

    @Autowired
    private QuoteService quoteService;

    @Autowired
    private PublicEndpointRateLimiter rateLimiter;

    private String getClientIp(HttpServletRequest request) {
        String xfHeader = request.getHeader("X-Forwarded-For");
        if (xfHeader != null && !xfHeader.isEmpty()) {
            return xfHeader.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }

    @PostMapping("/calculate")
    public double calculateQuote(@RequestBody QuoteRequest request, HttpServletRequest httpRequest) {
        String clientIp = getClientIp(httpRequest);

        // Rate limit: max 60 calculations per minute per IP
        if (!rateLimiter.allowRequest("quote", clientIp, 60, 60 * 1000L)) {
            throw new RuntimeException("Too many calculation requests. Please slow down.");
        }

        if (request == null) {
            throw new RuntimeException("Quote request body is required");
        }

        return quoteService.calculateQuote(request.getWeight(), request.getServiceType(), request.getDistance());
    }

    @GetMapping("/rates")
    public QuoteSettings getRates() {
        return quoteService.getSettings();
    }

    @PutMapping("/settings")
    public QuoteSettings updateSettings(@RequestBody QuoteSettings settings) {
        return quoteService.updateSettings(settings);
    }

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
