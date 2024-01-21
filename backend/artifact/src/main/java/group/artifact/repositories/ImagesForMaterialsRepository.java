package group.artifact.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import group.artifact.models.keys.ImagesForMaterialsKey;
import group.artifact.models.mappers.ImagesForMaterials;

public interface ImagesForMaterialsRepository extends JpaRepository<ImagesForMaterials, ImagesForMaterialsKey>{
    
}
