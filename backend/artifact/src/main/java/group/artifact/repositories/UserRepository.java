package group.artifact.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import group.artifact.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>{
    
}
