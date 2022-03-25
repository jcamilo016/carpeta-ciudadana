package com.vobi.bank.controller;

import com.vobi.bank.message.ResponseFile;
import com.vobi.bank.message.ResponseMessage;
import com.vobi.bank.model.FileDB;
import com.vobi.bank.service.CitizenService;
import com.vobi.bank.service.FileStorageService;
import com.vobi.bank.service.NotificationsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/documents")
@CrossOrigin(origins = "*")
public class FileController {
    @Autowired
    private FileStorageService storageService;

    @Autowired
    private NotificationsService notificationsService;

    @Operation(summary = "Permite subir un archivo y asociarlo a un usuario")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "202", description = "Created"),
            @ApiResponse(responseCode = "500", description = "failed : Application Error.", content = @Content),
    })
    @PostMapping("/upload/{citizenId}")
    public ResponseEntity<ResponseMessage> uploadFile(
            @RequestParam("file") MultipartFile file,
            @PathVariable("citizenId") int citizenId
    ) {
        String message = "";
        try {
            storageService.store(file, citizenId);
            message = "Uploaded the file successfully: " + file.getOriginalFilename();
            notificationsService.sendEmail(citizenId, "New file uploaded",message);
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
        } catch (Exception e) {
            message = "Could not upload the file: " + file.getOriginalFilename() + "!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
        }
    }

    @Operation(summary = "Permite listar los archivos del usuario")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Created"),
            @ApiResponse(responseCode = "500", description = "failed : Application Error.", content = @Content),
    })
    @GetMapping("/files/{citizenId}")
    public ResponseEntity<List<ResponseFile>> getCitizenListFiles(@PathVariable("citizenId") int citizenId) throws Exception {
        List<ResponseFile> files = storageService.findCitizenFiles(citizenId).stream().map(dbFile -> {
            String fileDownloadUri = ServletUriComponentsBuilder
                    .fromCurrentContextPath()
                    .path("/api/v1/documents/file/")
                    .path(dbFile.getId())
                    .toUriString();
            return new ResponseFile(
                    dbFile.getName(),
                    fileDownloadUri,
                    dbFile.getType(),
                    dbFile.getData().length);
        }).collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.OK).body(files);
    }

    @Operation(summary = "Permite descargar los archivos del usuario")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Created"),
            @ApiResponse(responseCode = "500", description = "failed : Application Error.", content = @Content),
    })
    @GetMapping("/file/{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable String id) {
        FileDB fileDB = storageService.getFile(id);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileDB.getName() + "\"")
                .body(fileDB.getData());
    }
}
