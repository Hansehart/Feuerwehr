package group.artifact.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import group.artifact.models.Preview;

@Repository
public interface PreviewRepository extends JpaRepository<Preview, Integer> {
    @Query("SELECT p FROM Preview p WHERE p.path LIKE :keyword")
    List<Preview> findAllByPathStartingWith(String keyword);
}
