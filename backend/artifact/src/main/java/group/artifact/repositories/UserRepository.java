package group.artifact.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import group.artifact.models.User;

public interface UserRepository extends JpaRepository<User, Integer>{
    
}
