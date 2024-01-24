package group.artifact.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import group.artifact.models.keys.ImagesForVehiclesKey;
import group.artifact.models.mappers.ImagesForVehicles;

@Repository
public interface ImagesForVehiclesRepository extends JpaRepository<ImagesForVehicles, ImagesForVehiclesKey>{
    
}
