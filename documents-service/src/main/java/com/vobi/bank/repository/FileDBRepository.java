package com.vobi.bank.repository;

import com.vobi.bank.model.FileDB;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FileDBRepository extends JpaRepository<FileDB, String> {
    List<FileDB> findByCitizenid(int citizenId);
}
