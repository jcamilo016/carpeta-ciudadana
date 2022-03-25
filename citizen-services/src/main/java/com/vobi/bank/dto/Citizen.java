package com.vobi.bank.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Citizen {
    @NotNull
    @Positive
    private int id;

    @NotNull
    private String name;

    @NotNull
    private String address;

    @NotNull
    @Email
    private String email;

    @NotNull
    @Positive
    private int operatorId;

    @NotNull
    private String operatorName;
}
