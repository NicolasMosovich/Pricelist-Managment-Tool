package com.enlightedCRM.supplierCostsList.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.enlightedCRM.supplierCostsList.model.PriceList;
import com.enlightedCRM.supplierCostsList.model.Supplier;
import com.enlightedCRM.supplierCostsList.service.PriceListService;
import com.enlightedCRM.supplierCostsList.service.SupplierService;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/suppliers")
@CrossOrigin(origins = "http://localhost:5173")
public class SupplierControllerImpl {

    private final SupplierService supplierService;
    private final PriceListService priceListService;

    public SupplierControllerImpl(SupplierService supplierService, PriceListService priceListService) {
        this.supplierService = supplierService;
        this.priceListService = priceListService;
    }

    @GetMapping
    public ResponseEntity<List<Supplier>> getAllSuppliers() {
        List<Supplier> suppliers = supplierService.getAllSuppliers();
        return ResponseEntity.ok(suppliers);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Supplier> getSupplierById(@PathVariable Long id) {
        Supplier supplier = supplierService.getSupplierById(id);
        return ResponseEntity.ok(supplier);
    }

    @GetMapping("/search/{query}")
    public ResponseEntity<List<Supplier>> getSupplierByQuery(@PathVariable String query) {
        List<Supplier> suppliers = supplierService.getSupplierByQuery(query);
        return ResponseEntity.ok(suppliers);
    }

    @GetMapping("/{id}/latest-list")
    public ResponseEntity<PriceList> getSupplierLatestList(@PathVariable Long id) {
        PriceList priceList = priceListService.getSupplierLatestList(id);
        return ResponseEntity.ok(priceList);
    }

    @PutMapping("/price-lists/{priceListId}/status")
    public ResponseEntity<PriceList> updatePriceListStatus(
            @PathVariable Long priceListId,
            @RequestParam Integer statusCode) {
        PriceList updatedPriceList = priceListService.updatePriceListStatus(priceListId, statusCode);
        return ResponseEntity.ok(updatedPriceList);
    }

    @GetMapping("/{id}/price-lists")
    public ResponseEntity<List<PriceList>> getPriceListHistory(@PathVariable Long id) {
        List<PriceList> history = priceListService.getPriceListHistory(id);
        return ResponseEntity.ok(history);
    }

}
