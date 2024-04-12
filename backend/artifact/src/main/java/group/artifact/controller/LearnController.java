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
public class LearnController {

    @Autowired
    ContentpageRepository contentpageRepository;

    @GetMapping("/receive/question")
    public List<Contentpage> receiveQuestion(@RequestParam(required = false) String type) {
        if (type.equals("vehicle")) {
            return contentpageRepository.findAllByPathStartingWith("/vehicle%");
        } else if (type.equals("learn")) {
            return contentpageRepository.findAllByPathStartingWith("/learn%");
        } else {
            System.out.println("ERROR: type unknown in query string");
            return null;
        }
    }

    @GetMapping("/receive/answer")
    public List<Contentpage> receiveAnswer(@RequestParam(required = false) String type) {
        if (type.equals("vehicle")) {
            return contentpageRepository.findAllByPathStartingWith("/vehicle%");
        } else if (type.equals("learn")) {
            return contentpageRepository.findAllByPathStartingWith("/learn%");
        } else {
            System.out.println("ERROR: type unknown in query string");
            return null;
        }
    }

    @PostMapping("/save/question")
    public void saveQuestion(@RequestBody Contentpage cp) {
        contentpageRepository.save(cp);
    }

    @PostMapping("/save/answer")
    public void saveAnswer(@RequestBody Contentpage cp) {
        contentpageRepository.save(cp);
    }
}
