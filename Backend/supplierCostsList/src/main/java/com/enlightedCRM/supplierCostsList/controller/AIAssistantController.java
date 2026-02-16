package com.enlightedCRM.supplierCostsList.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.enlightedCRM.supplierCostsList.dto.AIRequest;
import com.enlightedCRM.supplierCostsList.dto.AIResponse;
import com.enlightedCRM.supplierCostsList.service.AIAssistantService;

@RestController
@RequestMapping("/ai-assistant")
@CrossOrigin(origins = "http://localhost:5173")
public class AIAssistantController {

    private final AIAssistantService aiAssistantService;

    public AIAssistantController(AIAssistantService aiAssistantService) {
        this.aiAssistantService = aiAssistantService;
    }

    @PostMapping("/ask")
    public ResponseEntity<AIResponse> ask(@RequestBody AIRequest request) {
        String answer = aiAssistantService.askGemini(request.question());
        AIResponse response = new AIResponse(answer);
        return ResponseEntity.ok(response);
    }
}
