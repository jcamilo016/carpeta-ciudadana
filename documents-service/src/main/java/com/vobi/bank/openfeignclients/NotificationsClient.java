package com.vobi.bank.openfeignclients;

import com.vobi.bank.dto.SendEmailRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(
        value = "notifications"
)
public interface NotificationsClient {
    @PostMapping("/api/v1/notifications/sendMail")
    SimpleMailMessage sendEmailMessage(@RequestBody SendEmailRequest sendEmailRequest);
}
