package group.artifact.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import group.artifact.models.StorageLocation;

@Repository
public interface StorageLocationRepository extends JpaRepository<StorageLocation, Integer>{
    
}

