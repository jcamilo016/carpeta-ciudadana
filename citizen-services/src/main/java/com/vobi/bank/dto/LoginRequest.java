package com.vobi.bank.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@Getter
@Setter
public class LoginRequest {

    @NotNull
    @Positive
    private int citizenId;

    @NotNull
    private String password;
}
