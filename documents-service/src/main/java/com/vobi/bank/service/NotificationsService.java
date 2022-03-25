package com.vobi.bank.service;

import com.vobi.bank.dto.SendEmailRequest;
import com.vobi.bank.model.CitizenDB;
import com.vobi.bank.openfeignclients.NotificationsClient;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class NotificationsService {

    @Autowired
    private NotificationsClient notificationsClient;

    @Autowired
    CitizenService citizenService;

    public void sendEmail(int citizenId, String subject, String text) throws Exception {
        if (citizenService.citizenExists(citizenId)) {
            CitizenDB citizen = citizenService.findCitizenById(citizenId);
            SendEmailRequest emailRequest = new SendEmailRequest(citizen.getEmail(), subject, text);
            new Thread(() -> {
                notificationsClient.sendEmailMessage(emailRequest);
            }).start();
        }
    }
}
