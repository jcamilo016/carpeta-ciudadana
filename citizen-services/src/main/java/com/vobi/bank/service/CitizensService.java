package com.vobi.bank.service;

import com.vobi.bank.dto.Citizen;
import com.vobi.bank.dto.LoginRequest;
import com.vobi.bank.model.CitizenDB;

public interface CitizensService {
    String registerCitizen(Citizen citizen);
    Citizen validateCitizen(LoginRequest loginRequest) throws Exception;
    String authenticateDocument(int citizenId, String urlDocument, String documentTitle);
    String saveCitizen(CitizenDB citizen) throws Exception;
}
