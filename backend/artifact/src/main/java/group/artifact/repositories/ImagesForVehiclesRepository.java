package group.artifact.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import group.artifact.models.keys.ImagesForVehiclesKey;
import group.artifact.models.mappers.ImagesForVehicles;

public interface ImagesForVehiclesRepository extends JpaRepository<ImagesForVehicles, ImagesForVehiclesKey>{
    
}
