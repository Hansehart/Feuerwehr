package group.artifact.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import group.artifact.models.User;
import group.artifact.models.mappers.UsersInFiredepartments;

public interface UsersInFiredepartmentRepository extends JpaRepository<UsersInFiredepartments, Integer>{
    List<UsersInFiredepartments> findByUser(User user);
}
