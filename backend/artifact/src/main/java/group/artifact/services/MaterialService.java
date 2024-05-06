package group.artifact.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import group.artifact.dtos.MaterialDTO;
import group.artifact.models.Material;
import group.artifact.models.Storage;
import group.artifact.models.mappers.StoragesWithMaterials;
import group.artifact.repositories.MaterialRepository;
import group.artifact.repositories.StorageRepository;
import group.artifact.repositories.StoragesWithMaterialsRepository;

@Service
public class MaterialService {
    @Autowired
    MaterialRepository materialRepository;
    @Autowired
    StorageRepository storageRepository;
    @Autowired
    StoragesWithMaterialsRepository storagesWithMaterialsRepository;

    public void save(MaterialDTO mat) {
        // extract material
        Material m = new Material();
        m.setName(mat.getName());
        m.setDescription(mat.getDescription());
        Material newMaterial = materialRepository.save(m);

        // find corresponding storage
        Storage s = storageRepository.findById(mat.getStid()).orElse(null);

        // fill the storage
        StoragesWithMaterials filledStorage = new StoragesWithMaterials();
        filledStorage.setStorage(s);
        filledStorage.setMaterial(newMaterial);
        filledStorage.setQuantity(mat.getQuantity());
        storagesWithMaterialsRepository.save(filledStorage);

    }
}
