package group.artifact.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import group.artifact.dtos.ImagesForContentpagesDTO;
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
@RequestMapping("/api/service")
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

    @PostMapping("/postman/image")
    private void postman(@RequestBody Image img) {
        imageRepository.save(img);
    }

    @PostMapping("/postman/cp")
    private void postman(@RequestBody Contentpage rcs) {
        contentpageRepository.save(rcs);
    }

    @PostMapping("/postman/imagesfor")
    private void postman(@RequestBody Map<String, Integer> requestParams) {
        Integer fkImage = requestParams.get("fk_image");
        Integer fkContentpage = requestParams.get("fk_contentpage");

        // create and save the DTO
        ImagesForContentpagesDTO dto = new ImagesForContentpagesDTO(fkImage, fkContentpage);
        ImagesForContentpages imagesForContentpages = new ImagesForContentpages(dto);
        imagesForContentpagesRepository.save(imagesForContentpages);
    }

    @GetMapping("/hello")
    private String hello() {
        return "Hello Test";
    }
}
