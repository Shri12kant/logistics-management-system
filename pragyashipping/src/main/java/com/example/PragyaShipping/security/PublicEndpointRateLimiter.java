package com.example.PragyaShipping.security;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedDeque;

import org.springframework.stereotype.Service;

@Service
public class PublicEndpointRateLimiter {

    // Store request timestamps per key (e.g. "contact:192.168.1.1")
    private final ConcurrentHashMap<String, ConcurrentLinkedDeque<Long>> requestLogs = new ConcurrentHashMap<>();

    /**
     * Checks if a request from an IP should be allowed based on a sliding window rate limit.
     *
     * @param category    e.g., "contact", "tracking", "quote"
     * @param ip          Client IP address
     * @param maxRequests Maximum requests allowed within window
     * @param windowMs    Window size in milliseconds
     * @return true if allowed, false if rate limit exceeded
     */
    public boolean allowRequest(String category, String ip, int maxRequests, long windowMs) {
        if (ip == null || ip.isBlank()) {
            return true;
        }

        String key = category + ":" + ip.trim();
        long now = System.currentTimeMillis();

        ConcurrentLinkedDeque<Long> timestamps = requestLogs.computeIfAbsent(key, k -> new ConcurrentLinkedDeque<>());

        // Evict timestamps older than the sliding window
        while (!timestamps.isEmpty() && (now - timestamps.peekFirst()) > windowMs) {
            timestamps.pollFirst();
        }

        // Check if under threshold
        if (timestamps.size() < maxRequests) {
            timestamps.addLast(now);
            return true;
        }

        return false;
    }
}
