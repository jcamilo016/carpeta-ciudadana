package com.vobi.bank.dto;

import lombok.Getter;

@Getter
public class SendEmailRequest {
    private String to;
    private String subject;
    private String text;
}
