package group.artifact.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import group.artifact.models.keys.ImagesForMaterialsKey;
import group.artifact.models.mappers.ImagesForMaterials;

@Repository
public interface ImagesForMaterialsRepository extends JpaRepository<ImagesForMaterials, ImagesForMaterialsKey>{
    
}
