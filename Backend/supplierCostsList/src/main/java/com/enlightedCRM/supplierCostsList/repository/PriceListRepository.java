package com.enlightedCRM.supplierCostsList.repository;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.enlightedCRM.supplierCostsList.model.PriceList;

@Repository
public interface PriceListRepository extends JpaRepository<PriceList, Long> {

    List<PriceList> findBySupplierId(Long id);

    @EntityGraph(attributePaths = { "items" })
    PriceList findFirstBySupplierIdOrderByVersionDesc(Long supplierId);

    @EntityGraph(attributePaths = { "items" })
    List<PriceList> findBySupplierIdOrderByVersionDesc(Long supplierId);
}
