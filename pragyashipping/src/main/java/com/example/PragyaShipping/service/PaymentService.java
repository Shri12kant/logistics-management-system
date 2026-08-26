package com.example.PragyaShipping.service;

import java.util.List;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.example.PragyaShipping.entity.Payment;
import com.example.PragyaShipping.entity.Shipment;
import com.example.PragyaShipping.repository.PaymentRepository;
import com.example.PragyaShipping.repository.ShipmentRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.Utils;

@Service
public class PaymentService {

    @Value("${razorpay.key-id:}")
    private String keyId;

    @Value("${razorpay.key-secret:}")
    private String keySecret;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private ShipmentRepository shipmentRepository;

    @Autowired
    private QuoteService quoteService;

    public boolean isConfigured() {
        return keyId != null && !keyId.isBlank()
                && keySecret != null && !keySecret.isBlank();
    }

    public String getKeyId() {
        return keyId;
    }

    public Map<String, Object> createOrder(Double amount, String customerName, String customerEmail,
                                           String customerPhone, Long shipmentId, String notes,
                                           Double weight, String serviceType, Double distance) throws Exception {
        if (!isConfigured()) {
            throw new RuntimeException("Payment is not configured. Add Razorpay keys in environment.");
        }

        if (shipmentId != null) {
            Shipment shipment = shipmentRepository.findById(shipmentId)
                    .orElseThrow(() -> new RuntimeException("Shipment not found"));
            amount = shipment.getAmount();
        } else if (weight != null) {
            amount = quoteService.calculateQuote(weight, serviceType, distance);
        }

        if (amount == null || amount < 1) {
            throw new RuntimeException("Minimum amount is ₹1");
        }

        int paise = (int) Math.round(amount * 100);

        RazorpayClient client = new RazorpayClient(keyId, keySecret);
        JSONObject request = new JSONObject();
        request.put("amount", paise);
        request.put("currency", "INR");
        request.put("receipt", "prg_" + System.currentTimeMillis());

        Order order = client.orders.create(request);

        Payment payment = new Payment();
        payment.setRazorpayOrderId(order.get("id"));
        payment.setAmount(amount);
        payment.setCurrency("INR");
        payment.setStatus("CREATED");
        payment.setCustomerName(customerName);
        payment.setCustomerEmail(customerEmail);
        payment.setCustomerPhone(customerPhone);
        payment.setShipmentId(shipmentId);
        payment.setNotes(notes);
        paymentRepository.save(payment);

        return Map.of(
                "orderId", order.get("id").toString(),
                "amount", paise,
                "currency", "INR",
                "keyId", keyId
        );
    }

    public Payment verify(String orderId, String paymentId, String signature) throws Exception {
        if (!isConfigured()) {
            throw new RuntimeException("Payment is not configured");
        }

        JSONObject options = new JSONObject();
        options.put("razorpay_order_id", orderId);
        options.put("razorpay_payment_id", paymentId);
        options.put("razorpay_signature", signature);

        boolean valid = Utils.verifyPaymentSignature(options, keySecret);
        if (!valid) {
            throw new RuntimeException("Payment signature invalid");
        }

        Payment payment = paymentRepository.findByRazorpayOrderId(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        payment.setRazorpayPaymentId(paymentId);
        payment.setRazorpaySignature(signature);
        payment.setStatus("PAID");
        paymentRepository.save(payment);

        if (payment.getShipmentId() != null) {
            shipmentRepository.findById(payment.getShipmentId()).ifPresent(shipment -> {
                shipment.setPaymentStatus("PAID");
                shipmentRepository.save(shipment);
            });
        }

        return payment;
    }

    public List<Payment> getAll() {
        return paymentRepository.findAllByOrderByCreatedAtDesc();
    }
}
