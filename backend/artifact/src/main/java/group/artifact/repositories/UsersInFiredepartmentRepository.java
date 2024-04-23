package group.artifact.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import group.artifact.models.mappers.UsersInFiredepartments;

public interface UsersInFiredepartmentRepository extends JpaRepository<UsersInFiredepartments, Integer>{
    
}
