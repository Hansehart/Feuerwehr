package group.artifact.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import group.artifact.models.Storage;
import group.artifact.models.Vehicle;

@Repository
public interface StorageRepository extends JpaRepository<Storage, Integer> {
    List<Storage> findByVehicle(Vehicle vid);
}
