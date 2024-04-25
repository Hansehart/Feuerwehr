package group.artifact.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import group.artifact.models.Preview;
import group.artifact.repositories.PreviewRepository;

@Service
public class PreviewService {

    @Autowired
    PreviewRepository previewRepository;

    public List<Preview> receive(String type) {
        if (type.equals("learn")) {
            return previewRepository.findAllByPathStartingWith("/learn%");
        } else if (type.equals("profile")) {
            return previewRepository.findAllByPathStartingWith("/profile%");
        } else {
            System.out.println("ERROR: type unknown in query string when searching for preview");
            return null;
        }
    }

    public void save(Preview p) {
        previewRepository.save(p);
    }

}
