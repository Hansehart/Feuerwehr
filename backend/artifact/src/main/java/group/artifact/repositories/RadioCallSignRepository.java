package group.artifact.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import group.artifact.models.RadioCallSign;

@Repository
public interface RadioCallSignRepository extends JpaRepository<RadioCallSign, Integer>{
    
}
