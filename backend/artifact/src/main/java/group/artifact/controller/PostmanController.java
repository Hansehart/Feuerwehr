package group.artifact.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import group.artifact.models.RadioCallSign;
import group.artifact.repositories.RadioCallSignRepository;

@RestController
public class PostmanController {
    @Autowired
    RadioCallSignRepository radioCallSignRepository;

    @PostMapping("/postman")
    private void postman(@RequestBody RadioCallSign body) {
        RadioCallSign radioCallSign = new RadioCallSign();
        radioCallSignRepository.save(radioCallSign);
    }
}
