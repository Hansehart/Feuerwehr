package group.artifact.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import group.artifact.models.ImagesForVehicles;
import group.artifact.models.keys.ImagesForVehiclesKey;

public interface ImagesForVehiclesRepository extends JpaRepository<ImagesForVehicles, ImagesForVehiclesKey>{
    
}
