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
    PreviewService contentpageService;

    @GetMapping("/receive/previews")
    public ResponseEntity<List<Preview>> receiveContentpage(@RequestParam(required = true) String type) {
        try {
            List<Preview> cp = contentpageService.receive(type);
            return ResponseEntity.ok(cp);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        } 
    }

    @PostMapping("/save/previews")
    public ResponseEntity<String> saveContentpage(@RequestBody Preview cp) {
        try {
            contentpageService.save(cp);
            return ResponseEntity.ok("preview successfully created");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        } 
    }
}
