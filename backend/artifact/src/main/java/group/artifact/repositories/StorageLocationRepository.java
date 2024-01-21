package group.artifact.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import group.artifact.models.StorageLocation;

public interface StorageLocationRepository extends JpaRepository<StorageLocation, Integer>{
    
}

