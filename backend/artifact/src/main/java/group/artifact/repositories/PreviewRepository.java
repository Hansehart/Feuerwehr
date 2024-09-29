package group.artifact.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import group.artifact.models.Preview;

@Repository
public interface PreviewRepository extends JpaRepository<Preview, Integer> {

}
