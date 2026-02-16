package com.enlightedCRM.supplierCostsList.dto;

import java.time.LocalDateTime;

public record AIResponse(String answer, LocalDateTime timestamp) {
    public AIResponse(String answer) {
        this(answer, LocalDateTime.now());
    }
}
