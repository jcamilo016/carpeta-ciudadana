package com.vobi.bank.service;

import com.vobi.bank.model.CitizenDB;
import com.vobi.bank.repository.CitizenDbRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CitizenService {
    @Autowired
    CitizenDbRepository citizenRepository;

    public boolean citizenExists(int citizenId) {
        return citizenRepository.existsById(citizenId);
    }

    public CitizenDB findCitizenById(int citizenId) throws Exception {
        return citizenRepository.findById(citizenId).orElseThrow(() -> new Exception("Citizen not found"));
    }
}
