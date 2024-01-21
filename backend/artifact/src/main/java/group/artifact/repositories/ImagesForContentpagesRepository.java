package group.artifact.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import group.artifact.models.keys.ImagesForContentpagesKey;
import group.artifact.models.mappers.ImagesForContentpages;

public interface ImagesForContentpagesRepository extends JpaRepository<ImagesForContentpages, ImagesForContentpagesKey>{
    
}
