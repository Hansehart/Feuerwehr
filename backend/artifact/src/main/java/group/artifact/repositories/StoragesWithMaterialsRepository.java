package group.artifact.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import group.artifact.models.Material;
import group.artifact.models.Storage;
import group.artifact.models.mappers.StoragesWithMaterials;


@Repository
public interface StoragesWithMaterialsRepository extends JpaRepository<StoragesWithMaterials, Integer>{
    List<Material> findByStorage(Storage s);
}
