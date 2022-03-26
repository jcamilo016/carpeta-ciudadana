package com.vobi.bank.mapper;

import com.vobi.bank.dto.Citizen;
import com.vobi.bank.model.CitizenDB;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface CitizenMapper {

    @Mapping(source="citizenId", target = "id")
    Citizen citizenDBtoCitizen(CitizenDB citizenDB);
}
