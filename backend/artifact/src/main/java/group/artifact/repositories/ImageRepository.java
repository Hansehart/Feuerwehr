package group.artifact.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import group.artifact.models.Image;

@Repository
public interface ImageRepository extends JpaRepository<Image, Integer>{
    
}
