package group.artifact.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import group.artifact.models.Quiz;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Integer>{
    
}
