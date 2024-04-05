package group.artifact.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import group.artifact.models.Contentpage;
import group.artifact.repositories.ContentpageRepository;

@RestController
@RequestMapping("/api/service")
public class ContentpageController {

    @Autowired
    ContentpageRepository contentpageRepository;

    @GetMapping("/hello2")
    public String hello() {
        return "Hello Test2";
    }

    @PostMapping("/save")
    public void postman(@RequestBody Contentpage cp) {
        contentpageRepository.save(cp);
    }
}
