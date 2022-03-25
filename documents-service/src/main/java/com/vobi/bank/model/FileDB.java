package com.vobi.bank.model;

import javax.persistence.*;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "files")
public class FileDB {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    private String name;

    private String type;

    @Lob
    @Column(name = "data", columnDefinition="BLOB")
    private byte[] data;

    @Column(name = "citizenid")
    private int citizenid;

    public FileDB(String name, String type, byte[] data, int citizenId) {
        this.name = name;
        this.type = type;
        this.data = data;
        this.citizenid = citizenId;
    }
}
