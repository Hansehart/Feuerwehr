package group.artifact.services;

import org.springframework.beans.factory.annotation.Autowired;

import group.artifact.models.Vehicle;
import group.artifact.repositories.VehicleRepository;

public class VehicleService {

    @Autowired
    VehicleRepository vehicleRepository;

    public void save(Vehicle vehicle) {

    }

    public Vehicle receive(Integer cs) { // call sign
        return vehicleRepository.findById(cs).orElse(null);
    }
}
