package com.enlightedCRM.supplierCostsList.service;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import com.enlightedCRM.supplierCostsList.model.Supplier;
import com.enlightedCRM.supplierCostsList.repository.SupplierRepository;
import jakarta.persistence.EntityNotFoundException;

@Service 
public class SupplierService {
    
    private final SupplierRepository supplierRepository;

    public SupplierService(SupplierRepository supplierRepository){
        this.supplierRepository = supplierRepository;
    }

    public List<Supplier> getAllSuppliers(){
        return supplierRepository.findAll();
    }

    public Supplier getSupplierById(Long id) {
        return supplierRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Supplier not found"));
        
    }

    public List<Supplier> getSupplierByQuery(String query){
        
        if (query == null || query.trim().isEmpty()) {
            return Collections.emptyList();
        }
        
        String queryLower = query.trim().toLowerCase();
        List<Supplier> suppliers = supplierRepository.findAll();
        
        return suppliers.stream()
            .filter(s -> 
                (s.getName() != null && s.getName().toLowerCase().contains(queryLower))
            )
            .collect(Collectors.toList());
    }
}
