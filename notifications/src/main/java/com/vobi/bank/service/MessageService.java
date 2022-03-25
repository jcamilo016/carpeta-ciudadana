package com.vobi.bank.service;

import com.vobi.bank.config.EmailConfig;
import com.vobi.bank.exception.SendEmailException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MessageService {
    @Autowired
    EmailConfig emailConfig;

    @Autowired
    private JavaMailSender emailSender;

    public SimpleMailMessage sendEmailMessage(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(emailConfig.getFrom());
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);

        try {
            emailSender.send(message);
        } catch (MailException ex) {
            throw new SendEmailException(ex.getMessage());
        }

        return message;
    }
}
