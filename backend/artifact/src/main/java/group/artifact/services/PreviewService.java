package group.artifact.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import group.artifact.models.Preview;
import group.artifact.repositories.PreviewRepository;


@Service
public class PreviewService {

    @Autowired
    PreviewRepository previewRepository;

    public List<Preview> receive(String path) {
        if (!path.isEmpty()) {
            return getPages(previewRepository.findAll(), path);
        } else {
            System.out.println("ERROR: type unknown in query string when searching for preview");
            return null;
        }
    }

    public void save(Preview p) {
        previewRepository.save(p);
    }

    private List<Preview> getPages(List<Preview> previews, String path) {
        long baseSlashCount = path.chars().filter(ch -> ch == '/').count();
        return previews.stream()
                .filter(preview -> preview.getPath().startsWith(path) && preview.getPath().chars().filter(ch -> ch == '/').count() == baseSlashCount + 1)
                .collect(Collectors.toList());
    }

}
