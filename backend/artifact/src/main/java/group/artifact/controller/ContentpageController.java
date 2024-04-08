package group.artifact.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import group.artifact.models.Contentpage;
import group.artifact.repositories.ContentpageRepository;

@RestController
@RequestMapping("/api/service")
public class ContentpageController {

    @Autowired
    ContentpageRepository contentpageRepository;

    @GetMapping("/receive/contentpages")
    public List<Contentpage> receiveContentpage(@RequestParam(required = false) String type) {
        System.out.println(type);
        if (type == "vehicle") {
            return contentpageRepository.findAllByPathStartingWith("/vehicle%");
        } else if (type == "learn") {
            return contentpageRepository.findAllByPathStartingWith("/learn%");
        } else {
            System.out.println("ERROR: type unknown in query string");
            return null;
        }
    }

    @PostMapping("/save/contentpage")
    public void saveContentpage(@RequestBody Contentpage cp) {
        contentpageRepository.save(cp);
    }
}
