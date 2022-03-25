package com.vobi.bank.controller;

import com.vobi.bank.dto.Citizen;
import com.vobi.bank.model.CitizenDB;
import com.vobi.bank.service.CitizensService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/citizens")
@CrossOrigin(origins = "*")
public class CitizensController {

    @Autowired
    CitizensService citizensService;

    @Operation(summary = "Notifica el registro exitoso de un ciudadno ó empresa en el Operador  ")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "202", description = "Created"),
            @ApiResponse(responseCode = "500", description = "failed : Application Error."),
            @ApiResponse(responseCode = "501", description = "failed : Wrong Parameters.",
                    content = @Content)
    })
    @PostMapping(value = "/register")
    public ResponseEntity<String> registerCitizen(@Valid @RequestBody CitizenDB citizen) throws Exception {
        String response = citizensService.saveCitizen(citizen);
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @Operation(summary = "Validacion de un Ciudadano para la inscripcion en un operador de carpeta ciudadana.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "204", description = "Not Content"),
            @ApiResponse(responseCode = "500", description = "failed : Application Error.",
                    content = @Content)
    })
    @GetMapping(value = "/validate/{id}")
    public ResponseEntity<String> validateCitizen(@PathVariable("id") int id) throws Exception {
        String response = citizensService.validateCitizen(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Operation(summary = "Solicitud de atenticacion de documentos.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "204", description = "Not Content"),
            @ApiResponse(responseCode = "500", description = "failed : Application Error.",
                    content = @Content)
    })
    @GetMapping(value = "/authenticateDocument/{id}/{urlDocument}/{documentTitle}")
    public ResponseEntity<String> authenticateDocument(
            @PathVariable("id") int id,
            @PathVariable("urlDocument") String urlDocument,
            @PathVariable("documentTitle") String documentTitle
    ) {
        String response = citizensService.authenticateDocument(id, urlDocument, documentTitle);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
