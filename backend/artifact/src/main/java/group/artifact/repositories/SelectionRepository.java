package group.artifact.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import group.artifact.models.Question;
import group.artifact.models.Selection;

@Repository
public interface SelectionRepository extends JpaRepository<Selection, Integer>{

    List<Selection> findByQuestion(Question q);
    
}
