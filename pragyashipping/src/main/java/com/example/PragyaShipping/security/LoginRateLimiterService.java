package com.example.PragyaShipping.security;

import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Service;

@Service
public class LoginRateLimiterService {

    public static final int MAX_ATTEMPTS = 5;
    public static final long LOCK_DURATION_MS = 15 * 60 * 1000; // 15 minutes lockout

    private static class AttemptDetails {
        int attempts;
        long lastAttemptTime;
        long lockExpiryTime;

        AttemptDetails(int attempts, long lastAttemptTime) {
            this.attempts = attempts;
            this.lastAttemptTime = lastAttemptTime;
            this.lockExpiryTime = 0;
        }
    }

    private final ConcurrentHashMap<String, AttemptDetails> attemptsCache = new ConcurrentHashMap<>();

    public boolean isBlocked(String key) {
        if (key == null || key.isBlank()) {
            return false;
        }

        AttemptDetails details = attemptsCache.get(key);
        if (details == null) {
            return false;
        }

        long now = System.currentTimeMillis();
        if (details.lockExpiryTime > 0) {
            if (now < details.lockExpiryTime) {
                return true;
            } else {
                // Lock has expired, reset tracker
                attemptsCache.remove(key);
                return false;
            }
        }

        return false;
    }

    public long getRemainingLockoutSeconds(String key) {
        if (key == null) return 0;
        AttemptDetails details = attemptsCache.get(key);
        if (details == null || details.lockExpiryTime == 0) return 0;

        long diff = details.lockExpiryTime - System.currentTimeMillis();
        return diff > 0 ? (diff / 1000) : 0;
    }

    public int getRemainingAttempts(String key) {
        if (key == null) return MAX_ATTEMPTS;
        AttemptDetails details = attemptsCache.get(key);
        if (details == null) return MAX_ATTEMPTS;
        return Math.max(0, MAX_ATTEMPTS - details.attempts);
    }

    public void recordFailedAttempt(String key) {
        if (key == null || key.isBlank()) return;

        long now = System.currentTimeMillis();
        attemptsCache.compute(key, (k, details) -> {
            if (details == null) {
                return new AttemptDetails(1, now);
            }

            // If the last attempt was older than lockout duration and not locked, reset count
            if (details.lockExpiryTime == 0 && (now - details.lastAttemptTime > LOCK_DURATION_MS)) {
                details.attempts = 1;
                details.lastAttemptTime = now;
                details.lockExpiryTime = 0;
                return details;
            }

            details.attempts++;
            details.lastAttemptTime = now;

            if (details.attempts >= MAX_ATTEMPTS) {
                details.lockExpiryTime = now + LOCK_DURATION_MS;
            }

            return details;
        });
    }

    public void resetAttempts(String key) {
        if (key != null) {
            attemptsCache.remove(key);
        }
    }
}
