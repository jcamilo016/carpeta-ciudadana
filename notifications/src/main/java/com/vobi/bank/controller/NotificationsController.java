package com.vobi.bank.controller;

import com.vobi.bank.dto.SendEmailRequest;
import com.vobi.bank.service.MessageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping("/api/v1/notifications")
public class NotificationsController {
    @Autowired
    private MessageService messageService;

    @Operation(summary = "Send an email message to the email address with the specified subject and message body ")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "202", description = "Email message sent"),
            @ApiResponse(responseCode = "406", description = "Invalid email address provided",
                    content = @Content)
    })
    @PostMapping(value = "/sendMail")
    public ResponseEntity<SimpleMailMessage> sendEmailMessage(@RequestBody SendEmailRequest sendEmailRequest) {
        SimpleMailMessage messageSent = messageService
                .sendEmailMessage(sendEmailRequest.getTo(), sendEmailRequest.getSubject(), sendEmailRequest.getText());
        return new ResponseEntity<>(messageSent, HttpStatus.ACCEPTED);
    }
}
