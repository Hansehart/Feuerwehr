package group.artifact.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import group.artifact.models.Question;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Integer> {
    @Query(value = "SELECT * FROM question WHERE category = :category ORDER BY RANDOM() LIMIT 1", nativeQuery = true)
    Question findRandomByCategory(@Param("category") String category);

    @Query(value = "SELECT * FROM question ORDER BY RANDOM() LIMIT 1", nativeQuery = true)
    Question findRandomQuestion();

    @Query(value = "SELECT DISTINCT category FROM question", nativeQuery = true)
    List<String> findAllCategories();
}
