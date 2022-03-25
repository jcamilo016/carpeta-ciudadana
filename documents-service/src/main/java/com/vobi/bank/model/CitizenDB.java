package com.vobi.bank.model;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "citizen")
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class CitizenDB implements java.io.Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "cid", unique = true, nullable = false)
    @NotNull
    private int id;

    @Column(name = "name")
    @NotNull
    private String name;

    @Column(name = "address")
    @NotNull
    private String address;

    @Column(name = "email")
    @NotNull
    @Email
    private String email;

    @Column(name = "operatorid", nullable = false)
    @NotNull
    private int operatorId;

    @Column(name = "operatorname")
    @NotNull
    private String operatorName;

    @Column(name = "password")
    @NotNull
    private String password;
}
