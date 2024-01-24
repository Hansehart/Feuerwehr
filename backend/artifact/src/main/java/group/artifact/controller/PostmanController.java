package group.artifact.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import group.artifact.models.Contentpage;
import group.artifact.models.Image;
import group.artifact.models.mappers.ImagesForContentpages;
import group.artifact.repositories.ContentpageRepository;
import group.artifact.repositories.ImageRepository;
import group.artifact.repositories.ImagesForContentpagesRepository;
import group.artifact.repositories.ImagesForVehiclesRepository;
import group.artifact.repositories.RadioCallSignRepository;
import group.artifact.repositories.VehicleRepository;

@RestController
public class PostmanController {
    @Autowired
    RadioCallSignRepository radioCallSignRepository;

    @Autowired
    ImageRepository imageRepository;

    @Autowired
    VehicleRepository vehicleRepository;

    @Autowired
    ContentpageRepository contentpageRepository;

    @Autowired
    ImagesForVehiclesRepository imagesForVehiclesRepository;

    @Autowired
    ImagesForContentpagesRepository imagesForContentpagesRepository;

    @PostMapping("/postman/cp")
    private void postman(@RequestBody Contentpage rcs) {
        contentpageRepository.save(rcs);
    }

    @PostMapping("/postman/imagesfor")
    private void postman(@RequestBody Map<String, Integer> requestParams) {
        Integer fkImage = requestParams.get("fk_image");
        Integer fk = requestParams.get("fk_contentpage");

        Image img = imageRepository.getReferenceById(fkImage);
        Contentpage v = contentpageRepository.getReferenceById(fk);
        ImagesForContentpages imgFVehicles = new ImagesForContentpages();

        System.out.println(img.toString() + "" + v.toString());

        imgFVehicles.setImage(img);
        imgFVehicles.setContentpage(v);
        imagesForContentpagesRepository.save(imgFVehicles);
    }
}
