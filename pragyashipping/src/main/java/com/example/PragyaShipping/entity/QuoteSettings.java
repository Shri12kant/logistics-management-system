package com.example.PragyaShipping.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "quote_settings")
public class QuoteSettings {

    @Id
    private Long id = 1L;

    @Column(nullable = false)
    private Double standardRate = 50.0;

    @Column(nullable = false)
    private Double expressRate = 80.0;

    @Column(nullable = false)
    private Double premiumRate = 120.0;

    @Column(nullable = false)
    private Double minimumCharge = 200.0;

    @Column(nullable = false)
    private Double baseDistanceKm = 100.0;

    @Column(nullable = false)
    private Double extraPerKm = 1.5;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Double getStandardRate() { return standardRate; }
    public void setStandardRate(Double standardRate) { this.standardRate = standardRate; }

    public Double getExpressRate() { return expressRate; }
    public void setExpressRate(Double expressRate) { this.expressRate = expressRate; }

    public Double getPremiumRate() { return premiumRate; }
    public void setPremiumRate(Double premiumRate) { this.premiumRate = premiumRate; }

    public Double getMinimumCharge() { return minimumCharge; }
    public void setMinimumCharge(Double minimumCharge) { this.minimumCharge = minimumCharge; }

    public Double getBaseDistanceKm() { return baseDistanceKm; }
    public void setBaseDistanceKm(Double baseDistanceKm) { this.baseDistanceKm = baseDistanceKm; }

    public Double getExtraPerKm() { return extraPerKm; }
    public void setExtraPerKm(Double extraPerKm) { this.extraPerKm = extraPerKm; }
}
