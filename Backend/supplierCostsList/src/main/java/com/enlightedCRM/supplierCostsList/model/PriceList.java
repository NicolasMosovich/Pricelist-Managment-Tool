package com.enlightedCRM.supplierCostsList.model;

import java.time.LocalDate;
import java.util.List;

import com.enlightedCRM.supplierCostsList.model.enums.PriceListStatus;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PriceList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonIgnoreProperties({ "priceLists" })
    private Supplier supplier;

    @Enumerated(EnumType.STRING)
    private PriceListStatus status; // PENDING, APPROVED, REJECTED

    private LocalDate effectiveDate; // When this price list becomes active
    private LocalDate submittedDate;

    private Integer version;

    @OneToMany(mappedBy = "priceList", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<PriceListItem> items;

    // Optional: reference to file in Cloud Storage
    private String originalFileUrl; // gs://bucket/supplier-1/2024-01-pricelist.xlsx
}