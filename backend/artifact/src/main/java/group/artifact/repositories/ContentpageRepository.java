package group.artifact.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import group.artifact.models.Contentpage;

public interface ContentpageRepository extends JpaRepository<Contentpage, Integer>{
    
}
