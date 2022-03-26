package com.vobi.bank.service;

import com.vobi.bank.dto.Citizen;
import com.vobi.bank.dto.LoginRequest;
import com.vobi.bank.mapper.CitizenMapper;
import com.vobi.bank.model.CitizenDB;
import com.vobi.bank.openfeignclients.CitizensServiceClient;
import com.vobi.bank.repository.CitizenDbRepository;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;

@Service
public class CitizensServiceImpl implements CitizensService {

    @Autowired
    CitizensServiceClient citizensServiceClient;

    @Autowired
    CitizenDbRepository citizenRepository;

    @Autowired
    CitizenMapper citizenMapper;

    @Override
    public String registerCitizen(Citizen citizen) {
        return citizensServiceClient.registerCitizen(citizen);
    }

    @Override
    public Citizen validateCitizen(LoginRequest request) throws Exception {
        String response = citizensServiceClient.validateCitizen(request.getCitizenId());

        if (StringUtils.isEmpty(response)) {
            throw new Exception("Ciudadano no encontrado");
        } else {
            CitizenDB citizen = citizenRepository
                    .findById(request.getCitizenId())
                    .orElseThrow(()-> new Exception("Ciudadano no encontrado"));

            if (!citizen.getPassword().equals(request.getPassword())) {
                throw new Exception("Contraseña inválida");
            }

            return citizenMapper.citizenDBtoCitizen(citizen);
        }
    }

    @Override
    public String authenticateDocument(int citizenId, String urlDocument, String documentTitle) {
        return citizensServiceClient.authenticateDocument(citizenId, urlDocument, documentTitle);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public String saveCitizen(CitizenDB citizenDB) throws Exception {
        String validateResponse = citizensServiceClient.validateCitizen(citizenDB.getCitizenId());
        if (StringUtils.isEmpty(validateResponse)) {
            if (Objects.isNull(citizenDB)) {
                throw new Exception("The citizen entity is null");
            }

            if (citizenRepository.existsById(citizenDB.getCitizenId())) {
                throw new Exception("Citizen already exists");
            }

            Citizen citizen = citizenMapper.citizenDBtoCitizen(citizenDB);

            String registerResponse = registerCitizen(citizen);
            citizenRepository.save(citizenDB);

            return registerResponse;
        } else {
            throw new Exception("Citizen already exists");
        }
    }
}
