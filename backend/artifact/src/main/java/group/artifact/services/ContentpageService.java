package group.artifact.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import group.artifact.models.Contentpage;
import group.artifact.repositories.ContentpageRepository;

@Service
public class ContentpageService {

    @Autowired
    ContentpageRepository contentpageRepository;

    public List<Contentpage> receive(String type) {
        if (type.equals("learn")) {
            return contentpageRepository.findAllByPathStartingWith("/learn%");
        } else if (type.equals("vehicle")) {
            return contentpageRepository.findAllByPathStartingWith("/vehicle%");
        } else if (type.equals("profile")) {
            return contentpageRepository.findAllByPathStartingWith("/profile%");
        } else {
            System.out.println("ERROR: type unknown in query string when searching for contentpage");
            return null;
        }
    }

    public void save(Contentpage cp) {
        contentpageRepository.save(cp);
    }

}
