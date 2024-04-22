package group.artifact.repositories;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import group.artifact.models.Firedepartment;

@Repository
public interface FiredepartmentRepository extends JpaRepository<Firedepartment, Integer> {
    @Query("SELECT fd.name FROM Firedepartment fd")
    List<String> findAllNames();
}
