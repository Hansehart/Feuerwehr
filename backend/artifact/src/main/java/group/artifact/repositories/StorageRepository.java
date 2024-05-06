package group.artifact.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import group.artifact.models.Storage;

@Repository
public interface StorageRepository extends JpaRepository<Storage, Integer>{
    
}

