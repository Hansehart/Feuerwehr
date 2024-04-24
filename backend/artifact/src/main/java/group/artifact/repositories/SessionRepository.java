package group.artifact.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import group.artifact.models.Session;

@Repository
public interface SessionRepository extends JpaRepository<Session, String> {
}
