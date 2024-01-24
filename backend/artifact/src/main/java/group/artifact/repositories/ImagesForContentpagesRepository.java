package group.artifact.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import group.artifact.models.keys.ImagesForContentpagesKey;
import group.artifact.models.mappers.ImagesForContentpages;

@Repository
public interface ImagesForContentpagesRepository extends JpaRepository<ImagesForContentpages, ImagesForContentpagesKey>{
    
}
