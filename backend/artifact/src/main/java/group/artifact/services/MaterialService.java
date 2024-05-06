package group.artifact.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import group.artifact.models.Material;

@Service
public class MaterialService {
    @Autowired
    MaterialService materialService;

    public void save(Material m) {
        materialService.save(m);
    }
    
}
