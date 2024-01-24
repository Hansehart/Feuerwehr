package group.artifact.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import group.artifact.models.Contentpage;

@Repository
public interface ContentpageRepository extends JpaRepository<Contentpage, Integer>{
    
}
