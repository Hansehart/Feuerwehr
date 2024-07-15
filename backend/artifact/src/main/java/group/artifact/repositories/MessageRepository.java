package group.artifact.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import group.artifact.models.Message;

@Repository
public interface MessageRepository extends JpaRepository<Message, Integer> {
    
}
