package group.artifact.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import group.artifact.models.Question;
import group.artifact.models.User;
import group.artifact.models.mappers.UsersAndQuestions;

@Repository
public interface UsersAndQuestionsRepository extends JpaRepository<UsersAndQuestions, Long> {
    boolean existsByUserAndQuestion(User user, Question question);
    long countByUser(User user);
}
