package com.vobi.bank.repository;

import com.vobi.bank.model.CitizenDB;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CitizenDbRepository extends JpaRepository<CitizenDB, Integer> {
}
