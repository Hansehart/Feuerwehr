package group.artifact.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import group.artifact.models.Message;
import group.artifact.services.ContactService;

@RestController
@RequestMapping("/api/service")
public class ContactController {
    @Autowired
    ContactService contactService;

    @PostMapping("/save/message")
    public ResponseEntity<String> saveMessage(@RequestBody Message m) {
        try {
            contactService.save(m);
            return ResponseEntity.ok(
                    "message successfully received");
        } catch (Exception e) {
            System.out.println("ERROR: " + e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
