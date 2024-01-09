package group.artifact.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import group.artifact.models.RadioCallSign;

public interface RadioCallSignRepository extends JpaRepository<RadioCallSign, Integer>{
    
}
