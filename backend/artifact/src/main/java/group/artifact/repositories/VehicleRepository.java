package group.artifact.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import group.artifact.models.Vehicle;

public interface VehicleRepository extends JpaRepository<Vehicle, Integer>{
    
}
