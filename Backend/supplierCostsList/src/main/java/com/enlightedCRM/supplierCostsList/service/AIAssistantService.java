package com.enlightedCRM.supplierCostsList.service;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.enlightedCRM.supplierCostsList.model.PriceList;
import com.enlightedCRM.supplierCostsList.model.PriceListItem;
import com.enlightedCRM.supplierCostsList.model.Supplier;

@Service
public class AIAssistantService {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;

    private final SupplierService supplierService;
    private final PriceListService priceListService;
    private final RestTemplate restTemplate;

    public AIAssistantService(SupplierService supplierService, PriceListService priceListService) {
        this.supplierService = supplierService;
        this.priceListService = priceListService;
        this.restTemplate = new RestTemplate();
    }

    public String aggregateContext() {
        List<Supplier> suppliers = supplierService.getAllSuppliers();
        StringBuilder context = new StringBuilder();

        context.append("SUPPLIER DATABASE CONTEXT:\n\n");
        context.append("Total Suppliers: ").append(suppliers.size()).append("\n\n");

        for (Supplier supplier : suppliers) {
            context.append("═══════════════════════════════════════\n");
            context.append("Supplier: ").append(supplier.getName()).append("\n");
            context.append("ID: ").append(supplier.getId()).append("\n");
            context.append("Email: ").append(supplier.getEmail()).append("\n");
            context.append("Phone: ").append(supplier.getPhone()).append("\n");
            context.append("Status: ").append(supplier.getStatus()).append("\n");

            // Fetch price lists for this supplier
            List<PriceList> priceLists = priceListService.getPriceListHistory(supplier.getId());
            if (priceLists != null && !priceLists.isEmpty()) {
                context.append("\nPrice Lists (").append(priceLists.size()).append(" versions):\n");

                for (PriceList priceList : priceLists) {
                    context.append("  - Version ").append(priceList.getVersion())
                            .append(" | Status: ").append(priceList.getStatus())
                            .append(" | Submitted: ").append(priceList.getSubmittedDate())
                            .append(" | Effective: ").append(priceList.getEffectiveDate())
                            .append(" | Items: ").append(priceList.getItems() != null ? priceList.getItems().size() : 0)
                            .append("\n");

                    // Add sample items from latest version
                    if (priceList.getItems() != null && !priceList.getItems().isEmpty()) {
                        context.append("    Sample Items:\n");
                        for (PriceListItem item : priceList.getItems()) {
                            context.append("      • ")
                                    .append(item.getProduct() != null ? item.getProduct().getName() : "N/A")
                                    .append(" - $").append(item.getPrice())
                                    .append(" (")
                                    .append(item.getProduct() != null ? item.getProduct().getCategory() : "N/A")
                                    .append(")")
                                    .append("\n");
                        }
                    }
                }
            } else {
                context.append("\nNo price lists available.\n");
            }
            context.append("\n");
        }

        return context.toString();
    }

    // Build a structured prompt for Gemini API

    private String buildPrompt(String context, String question) {
        return """
                You are an AI assistant for a supplier management system. You help users analyze supplier data and price lists.

                DATABASE CONTEXT:
                %s

                USER QUESTION: %s

                INSTRUCTIONS:
                - Provide a clear, concise, and accurate answer based ONLY on the data provided above
                - If the question cannot be answered with the available data, say so
                - Use specific numbers, names, and dates from the context
                - Format your response in a user-friendly way
                - Be professional and helpful

                Answer:
                """
                .formatted(context, question);
    }

    /**
     * Send question to Gemini API and get response
     */
    public String askGemini(String question) {
        try {
            // Aggregate context
            String context = aggregateContext();
            String prompt = buildPrompt(context, question);

            // Build request body for Gemini API
            Map<String, Object> requestBody = new HashMap<>();
            Map<String, Object> content = new HashMap<>();
            Map<String, String> part = new HashMap<>();
            part.put("text", prompt);
            content.put("parts", List.of(part));
            requestBody.put("contents", List.of(content));

            // Set headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

            // Make API call (API key in query parameter)
            String url = apiUrl + "?key=" + apiKey;
            ResponseEntity<Map> response = restTemplate.postForEntity(url, entity, Map.class);

            // Parse response
            if (response.getBody() != null) {
                List<Map<String, Object>> candidates = (List<Map<String, Object>>) response.getBody().get("candidates");
                if (candidates != null && !candidates.isEmpty()) {
                    Map<String, Object> candidate = candidates.get(0);
                    Map<String, Object> contentResponse = (Map<String, Object>) candidate.get("content");
                    List<Map<String, String>> parts = (List<Map<String, String>>) contentResponse.get("parts");
                    if (parts != null && !parts.isEmpty()) {
                        return parts.get(0).get("text");
                    }
                }
            }

            return "I apologize, but I couldn't generate a response. Please try again.";

        } catch (Exception e) {
            e.printStackTrace();
            return "Error: " + e.getMessage();
        }
    }
}
