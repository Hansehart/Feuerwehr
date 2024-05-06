package group.artifact.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import group.artifact.dtos.MaterialDTO;
import group.artifact.services.MaterialService;

@RestController
public class MaterialController {
    @Autowired
    MaterialService materialService;

    @PostMapping("")
    public ResponseEntity<String> saveMaterial(@RequestBody MaterialDTO m) {
        try {
            materialService.save(m);
            return ResponseEntity.ok(
                    "material successfully assigned to its coresponding storage");
        } catch (Exception e) {
            System.out.println("ERROR: " + e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
