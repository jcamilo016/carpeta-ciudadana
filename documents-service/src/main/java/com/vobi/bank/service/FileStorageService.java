package com.vobi.bank.service;

import com.vobi.bank.dto.SendEmailRequest;
import com.vobi.bank.model.FileDB;
import com.vobi.bank.openfeignclients.NotificationsClient;
import com.vobi.bank.repository.CitizenDbRepository;
import com.vobi.bank.repository.FileDBRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Stream;

@Service
public class FileStorageService {
    @Autowired
    private FileDBRepository fileDBRepository;

    @Autowired
    private CitizenDbRepository citizensRepository;

    @Autowired
    CitizenService citizenService;

    public void store(MultipartFile file, int citizenId) throws Exception {
        if (citizenService.citizenExists(citizenId)) {
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());
            FileDB FileDB = new FileDB(fileName, file.getContentType(), file.getBytes(), citizenId);
            fileDBRepository.save(FileDB);
        } else {
            throw new Exception("Citizen does not exist");
        }
    }

    public FileDB getFile(String id) {
        return fileDBRepository.findById(id).get();
    }

    @Transactional(readOnly = true)
    public List<FileDB> findCitizenFiles(int citizenId) throws Exception {
        if (citizensRepository.existsById(citizenId)) {
            return fileDBRepository.findByCitizenid(citizenId);
        }
        else {
            throw new Exception("Citizen does not exist!");
        }
    }
}
