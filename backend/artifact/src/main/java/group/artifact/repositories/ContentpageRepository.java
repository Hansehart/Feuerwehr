package group.artifact.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import group.artifact.models.Contentpage;

@Repository
public interface ContentpageRepository extends JpaRepository<Contentpage, Integer>{
    @Query("SELECT * FROM contentpage WHERE path LIKE 'home%'")
    List<Contentpage> findAllByPathContaining(String keyword);
}
