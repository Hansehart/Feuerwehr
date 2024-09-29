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

import group.artifact.models.Preview;
import group.artifact.services.PreviewService;

@RestController
@RequestMapping("/api/service")
public class PreviewController {

    @Autowired
    PreviewService previewService;

    @GetMapping("/receive/previews")
    public ResponseEntity<List<Preview>> receiveContentpage(@RequestParam(required = true) String type) {
        try {
            List<Preview> cp = previewService.receive(type);
            return ResponseEntity.ok(cp);
        } catch (Exception e) {
            System.out.println("ERROR: " + e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        } 
    }

    @PostMapping("/save/preview")
    public ResponseEntity<String> saveContentpage(@RequestBody Preview cp) {
        try {
            previewService.save(cp);
            return ResponseEntity.ok("preview successfully created");
        } catch (Exception e) {
            System.out.println("ERROR: " + e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        } 
    }
}
