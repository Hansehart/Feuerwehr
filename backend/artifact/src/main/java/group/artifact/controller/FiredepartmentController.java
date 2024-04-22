package group.artifact.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import group.artifact.dtos.MessageDTO;
import group.artifact.models.Firedepartment;
import group.artifact.services.FiredepartmentService;

@RestController
@RequestMapping("/api/service")
public class FiredepartmentController {

    @Autowired
    FiredepartmentService firedepartmentService;

    @GetMapping("/receive/firedepartments")
    public ResponseEntity<List<MessageDTO>> receiveAttributes(@RequestParam(required = true) String attr) { // attribute
        try {
            List<MessageDTO> attributes = firedepartmentService.receiveAllByAttribute(attr);
            return ResponseEntity.ok(attributes);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        } 
    }

    @GetMapping("/receive/firedepartment")
    public ResponseEntity<Firedepartment> receiveFiredepartment(@RequestParam(required = true) Integer fid) { // firedepartment id
        try {
            Firedepartment f = firedepartmentService.receiveById(fid);
            return ResponseEntity.ok(f);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        } 
    }

    @PostMapping("/save/firedepartment")
    public ResponseEntity<String> saveFiredepartment(@RequestBody Firedepartment f) {
        try {
            firedepartmentService.save(f);
            return ResponseEntity.ok("firedepartment successfully created");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        } 
    }
}
