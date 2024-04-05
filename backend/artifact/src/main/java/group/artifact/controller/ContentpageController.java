package group.artifact.controller;

import java.util.List;

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

    @GetMapping("/receive/contentpage")
    public List<Contentpage> receiveContentpage() {
        return contentpageRepository.findAll();
    }

    @PostMapping("/save/contentpage")
    public void saveContentpage(@RequestBody Contentpage cp) {
        contentpageRepository.save(cp);
    }
}
