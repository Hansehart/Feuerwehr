package group.artifact.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import group.artifact.models.Contentpage;
import group.artifact.models.Image;
import group.artifact.models.RadioCallSign;
import group.artifact.models.Vehicle;
import group.artifact.models.mappers.ImagesForContentpages;
import group.artifact.models.mappers.ImagesForVehicles;
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

        System.out.println(fk + " " + fkImage);

        Image img = imageRepository.getReferenceById(fkImage);
        
        System.out.println(img);

        Contentpage v = contentpageRepository.getReferenceById(fk);

        System.out.println(img + " " + v);
        
        ImagesForContentpages imgFVehicles = new ImagesForContentpages();
        imgFVehicles.setImageC(img);
        imgFVehicles.setContentpageI(v);
        imagesForContentpagesRepository.save(imgFVehicles);
    }

    // @PostMapping("/postman/imagesforvehicles")
    // private void postman(@RequestBody Map<String, Integer> requestParams) {
    //     Integer fkVehicle = requestParams.get("fk_vehicle");
    //     Integer fkImage = requestParams.get("fk_image");

    //     Image img = imageRepository.getReferenceById(fkImage);
    //     Vehicle v = vehicleRepository.getReferenceById(fkVehicle);

    //     System.out.println(fkVehicle + " " + fkImage);
    //     System.out.println(img + " " + v);
        
    //     ImagesForVehicles imgFVehicles = new ImagesForVehicles();
    //     imgFVehicles.setImage(img);
    //     imgFVehicles.setVehicle(v);
    //     imagesForVehiclesRepository.save(imgFVehicles);
    // }
}
