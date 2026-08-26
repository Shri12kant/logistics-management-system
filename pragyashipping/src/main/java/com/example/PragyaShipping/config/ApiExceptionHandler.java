package com.example.PragyaShipping.config;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, String>> runtime(RuntimeException ex) {
        String msg = ex.getMessage() == null ? "Request failed" : ex.getMessage();
        HttpStatus status = HttpStatus.BAD_REQUEST;

        String lower = msg.toLowerCase();
        if (lower.contains("invalid email or password")
                || lower.contains("current password is incorrect")) {
            status = HttpStatus.UNAUTHORIZED;
        } else if (lower.contains("not found")) {
            status = HttpStatus.NOT_FOUND;
        }

        return ResponseEntity.status(status).body(Map.of("message", msg));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> validation(MethodArgumentNotValidException ex) {
        String msg = ex.getBindingResult().getFieldErrors().stream()
                .findFirst()
                .map(err -> err.getField() + " " + err.getDefaultMessage())
                .orElse("Invalid input");
        return ResponseEntity.badRequest().body(Map.of("message", msg));
    }
}
