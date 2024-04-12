package group.artifact.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import group.artifact.models.Selection;

@Repository
public interface SelectionRepository extends JpaRepository<Selection, Integer>{
    
}
