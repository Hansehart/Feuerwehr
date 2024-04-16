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

import group.artifact.models.Contentpage;
import group.artifact.services.ContentpageService;

@RestController
@RequestMapping("/api/service")
public class ContentpageController {

    @Autowired
    ContentpageService contentpageService;

    @GetMapping("/receive/contentpages")
    public ResponseEntity<List<Contentpage>> receiveContentpage(@RequestParam(required = true) String type) {
        try {
            List<Contentpage> cp = contentpageService.receive(type);
            return ResponseEntity.ok(cp);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        } 
    }

    @PostMapping("/save/contentpage")
    public ResponseEntity<String> saveContentpage(@RequestBody Contentpage cp) {
        try {
            contentpageService.save(cp);
            return ResponseEntity.ok("contentpage successfully created");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        } 
    }
}
