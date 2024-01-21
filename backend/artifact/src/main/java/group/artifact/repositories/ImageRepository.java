package group.artifact.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import group.artifact.models.Image;

public interface ImageRepository extends JpaRepository<Image, Integer>{
    
}
