package com.example.PragyaShipping.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.PragyaShipping.entity.Payment;
import com.example.PragyaShipping.service.PaymentService;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @GetMapping("/config")
    public Map<String, Object> config() {
        return Map.of(
                "enabled", paymentService.isConfigured(),
                "keyId", paymentService.isConfigured() ? paymentService.getKeyId() : ""
        );
    }

    @PostMapping("/create-order")
    public ResponseEntity<?> createOrder(@RequestBody Map<String, Object> body) {
        try {
            Double amount = body.get("amount") == null ? null : Double.valueOf(body.get("amount").toString());
            String name = body.get("customerName") == null ? "" : body.get("customerName").toString();
            String email = body.get("customerEmail") == null ? "" : body.get("customerEmail").toString();
            String phone = body.get("customerPhone") == null ? "" : body.get("customerPhone").toString();
            Long shipmentId = body.get("shipmentId") == null || body.get("shipmentId").toString().isBlank()
                    ? null
                    : Long.valueOf(body.get("shipmentId").toString());
            String notes = body.get("notes") == null ? "" : body.get("notes").toString();
            Double weight = body.get("weight") == null || body.get("weight").toString().isBlank()
                    ? null
                    : Double.valueOf(body.get("weight").toString());
            String serviceType = body.get("serviceType") == null ? "STANDARD" : body.get("serviceType").toString();
            Double distance = body.get("distance") == null || body.get("distance").toString().isBlank()
                    ? null
                    : Double.valueOf(body.get("distance").toString());

            return ResponseEntity.ok(paymentService.createOrder(
                    amount, name, email, phone, shipmentId, notes, weight, serviceType, distance));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verify(@RequestBody Map<String, String> body) {
        try {
            Payment payment = paymentService.verify(
                    body.get("razorpay_order_id"),
                    body.get("razorpay_payment_id"),
                    body.get("razorpay_signature")
            );
            return ResponseEntity.ok(Map.of(
                    "status", payment.getStatus(),
                    "amount", payment.getAmount(),
                    "paymentId", payment.getRazorpayPaymentId() == null ? "" : payment.getRazorpayPaymentId()
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping
    public java.util.List<Payment> all() {
        return paymentService.getAll();
    }
}
