package group.artifact.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import group.artifact.models.Material;

@Repository
public interface MaterialRepository extends JpaRepository<Material, Integer> {
    
}
