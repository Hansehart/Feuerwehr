package group.artifact.services;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ch.qos.logback.core.boolex.Matcher;
import group.artifact.models.Preview;
import group.artifact.repositories.PreviewRepository;
import io.micrometer.common.util.StringUtils;


@Service
public class PreviewService {

    @Autowired
    PreviewRepository previewRepository;

    public List<Preview> receive(String type) {
        if (type.equals("learn")) {
            // return previewRepository.findAllByPathStartingWith("/learn%");
            return reducePreviewResultsToWantedSlashCountHirarchie(previewRepository.findAllByPathStartingWith("/learn%"), "/learn");
        } else if (type.equals("profile")) {
            return previewRepository.findAllByPathStartingWith("/profile%");
        } else if (type.equals("main")) {
            return previewRepository.findAllByPathStartingWith("/main%");
        } else if (type.equals("regulations")) {
            // return previewRepository.findAllByPathStartingWith("/learn/regulations%");
            return reducePreviewResultsToWantedSlashCountHirarchie(previewRepository.findAllByPathStartingWith("/learn/regulations%"), "/learn/regulations");
        } else {
            System.out.println("ERROR: type unknown in query string when searching for preview");
            return null;
        }
    }

    public void save(Preview p) {
        previewRepository.save(p);
    }

    private int numberOfSlashes(String str)
    {
        return str.length() - str.replace("\\", "").length();
    }

    private List<Preview> reducePreviewResultsToWantedSlashCountHirarchie(List<Preview> previews, String path)
    {
        String myLocalPath = path;
        if(path.length() == path.lastIndexOf("\\"))
        {
            myLocalPath = path.substring(0, path.length()-1);
        }
        
        int numSlashes = numberOfSlashes(myLocalPath);
        List<Preview> returnPreviews = new ArrayList<>(); 

        for (int i = 0; i < previews.size(); i++) 
        {
            if(numberOfSlashes(previews.get(0).getPath()) == numSlashes + 1 )
            {
                returnPreviews.add(previews.get(i));
            }
        }

        return returnPreviews;
    }

}
