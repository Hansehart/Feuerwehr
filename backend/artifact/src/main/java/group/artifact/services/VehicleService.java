package group.artifact.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import group.artifact.dtos.VehicleDTO;
import group.artifact.models.Vehicle;
import group.artifact.repositories.RadioCallSignRepository;
import group.artifact.repositories.VehicleRepository;

@Service
public class VehicleService {

    @Autowired
    VehicleRepository vehicleRepository;
    @Autowired
    RadioCallSignRepository radioCallSignRepository;

    public void save(VehicleDTO vehicle) {
        Vehicle v = new Vehicle();

        v.setRadioCallSign(vehicle.getRadioCallSign());
        v.setRadioVehicleType(vehicle.getRadioVehicleType());
        v.setRadioVehicleNumber(vehicle.getRadioVehicleNumber());
        v.setShortcut(vehicle.getShortcut());
        v.setName(vehicle.getName());

        radioCallSignRepository.save(vehicle.getRadioCallSign());
        vehicleRepository.save(v);
    }

    public Vehicle receive(Integer cs) { // call sign
        return vehicleRepository.findById(cs).orElse(null);
    }
}
