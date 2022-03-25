package com.vobi.bank;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class CitizenServicesApplication {

    public static void main(String[] args) {
        SpringApplication.run(CitizenServicesApplication.class, args);
    }

}
