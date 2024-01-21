package group.artifact.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import group.artifact.models.RadioCallSign;
import group.artifact.repositories.RadioCallSignRepository;
import group.artifact.models.Image;
import group.artifact.models.ImagesForVehicles;
import group.artifact.repositories.ImageRepository;
import group.artifact.repositories.ImagesForVehiclesRepository;



@RestController
public class PostmanController {
    @Autowired
    RadioCallSignRepository radioCallSignRepository;

    @Autowired
    ImageRepository imageRepository;

    @Autowired
    ImagesForVehiclesRepository imagesForVehiclesRepository;

    @PostMapping("/postman")
    private void postman(@RequestBody RadioCallSign rcs) {
        radioCallSignRepository.save(rcs);
    }

    @PostMapping("/postman/image")
    private void postman(@RequestBody Image img) {
        imageRepository.save(img);
    }

    @PostMapping("/postman/imageforvehicle")
    private void postman(@RequestBody ImagesForVehicles imgFVehicles) 
    {
        System.out.println("Log imageforvehicle");
        
        imagesForVehiclesRepository.save(imgFVehicles);
    }
}
