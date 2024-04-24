package group.artifact.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
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
    public ResponseEntity<List<Firedepartment>> receiveFiredepartments() {
        try {
            List<Firedepartment> fd = firedepartmentService.receiveAll();
            return ResponseEntity.ok(fd);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        } 
    }

    @GetMapping("/receive/firedepartment")
    public ResponseEntity<MessageDTO> receiveFiredepartmentInformation(@CookieValue(value = "sid") String sid, @RequestParam(required = true) String attr) { // attribute
        try {
            MessageDTO msg = firedepartmentService.receiveAttribute(sid, attr);
            return ResponseEntity.ok(msg);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        } 
    }

    @PostMapping("/save/firedepartment")
    public ResponseEntity<String> saveFiredepartment(@RequestBody Firedepartment fd) {
        try {
            firedepartmentService.save(fd);
            return ResponseEntity.ok("firedepartment successfully created");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        } 
    }
}
