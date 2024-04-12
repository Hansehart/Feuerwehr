package group.artifact.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import group.artifact.models.Answer;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Integer>{
    
}
