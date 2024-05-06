package group.artifact.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import group.artifact.models.mappers.StoragesWithMaterials;


@Repository
public interface StoragesWithMaterialsRepository extends JpaRepository<StoragesWithMaterials, Integer>{
    
}
