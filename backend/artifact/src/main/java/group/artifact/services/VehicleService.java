package group.artifact.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import group.artifact.dtos.VehicleDTO;
import group.artifact.models.Firedepartment;
import group.artifact.models.Vehicle;
import group.artifact.repositories.FiredepartmentRepository;
import group.artifact.repositories.VehicleRepository;

@Service
public class VehicleService {

    @Autowired
    VehicleRepository vehicleRepository;
    @Autowired
    FiredepartmentRepository firedepartmentRepository;

    public void save(VehicleDTO vehicle) {
        Vehicle v = new Vehicle();
        Firedepartment fd = firedepartmentRepository.findById(vehicle.getFid()).orElse(null);

        if (fd == null) {
            System.out.println("ERROR: saving vehicle was not possible, because provided firedepartment can't be found");
            return;
        }

        v.setFiredepartment(fd);
        v.setRadioVehicleType(vehicle.getRadioVehicleType());
        v.setRadioVehicleNumber(vehicle.getRadioVehicleNumber());
        v.setShortcut(vehicle.getShortcut());
        v.setName(vehicle.getName());

        vehicleRepository.save(v);
    }

    public Vehicle receive(Integer cs) { // call sign
        return vehicleRepository.findById(cs).orElse(null);
    }
}
