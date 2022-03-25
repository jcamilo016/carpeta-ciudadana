package com.vobi.bank.openfeignclients;

import com.vobi.bank.dto.Citizen;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;

@FeignClient(
        url = "${citizens.service.url}",
        value = "citizens-service"
)
public interface CitizensServiceClient {
    @PostMapping("/registerCitizen")
    String registerCitizen(@Valid @RequestBody Citizen payload);

    @GetMapping("/validateCitizen/{id}")
    String validateCitizen(@PathVariable("id") int id);

    @GetMapping("/authenticateDocument/{id}/{urlDocument}/{documentTitle}")
    String authenticateDocument(
            @PathVariable("id") int id,
            @PathVariable("urlDocument") String urlDocument,
            @PathVariable("documentTitle") String documentTitle
    );
}
