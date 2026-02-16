package com.enlightedCRM.supplierCostsList.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.enlightedCRM.supplierCostsList.model.PriceList;
import com.enlightedCRM.supplierCostsList.model.enums.PriceListStatus;
import com.enlightedCRM.supplierCostsList.repository.PriceListRepository;

@Service
public class PriceListService {

    private final PriceListRepository priceListRepository;

    public PriceListService(PriceListRepository priceListRepository) {
        this.priceListRepository = priceListRepository;
    }

    public PriceList getSupplierLatestList(Long id) {
        return priceListRepository.findFirstBySupplierIdOrderByVersionDesc(id);
    }

    public PriceList updatePriceListStatus(Long priceListId, Integer statusCode) {
        PriceList priceList = priceListRepository.findById(priceListId)
                .orElseThrow(() -> new RuntimeException("Price list not found with id: " + priceListId));

        // Convert status code to enum: 1 = APPROVED, 0 = REJECTED
        PriceListStatus newStatus = (statusCode == 1) ? PriceListStatus.APPROVED : PriceListStatus.REJECTED;
        priceList.setStatus(newStatus);

        return priceListRepository.save(priceList);
    }

    public List<PriceList> getPriceListHistory(Long supplierId) {
        return priceListRepository.findBySupplierIdOrderByVersionDesc(supplierId);
    }
}
