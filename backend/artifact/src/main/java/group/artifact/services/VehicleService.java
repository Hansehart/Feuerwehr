package group.artifact.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import group.artifact.dtos.VehicleDTO;
import group.artifact.models.Firedepartment;
import group.artifact.models.Session;
import group.artifact.models.Vehicle;
import group.artifact.repositories.FiredepartmentRepository;
import group.artifact.repositories.VehicleRepository;

@Service
public class VehicleService {

    @Autowired
    SessionService sessionService;
    @Autowired
    VehicleRepository vehicleRepository;
    @Autowired
    FiredepartmentRepository firedepartmentRepository;

    public void save(VehicleDTO vehicle) {
        Vehicle v = new Vehicle();
        Firedepartment fd = firedepartmentRepository.findById(vehicle.getFid()).orElse(null);

        if (fd == null) {
            System.out
                    .println("ERROR: saving vehicle was not possible, because provided firedepartment can't be found");
            return;
        }

        v.setFiredepartment(fd);
        v.setRadioVehicleType(vehicle.getRadioVehicleType());
        v.setRadioVehicleNumber(vehicle.getRadioVehicleNumber());
        v.setShortcut(vehicle.getShortcut());
        v.setName(vehicle.getName());

        vehicleRepository.save(v);
    }

    public VehicleDTO receiveVehicleFromCallSign(String sid, String rvt, String rvn) {
        List<VehicleDTO> vehicles = receiveVehiclesFromFiredepartment(sid);
        if (vehicles == null) {
            return null;
        }
        VehicleDTO dto = vehicles.stream()
                .filter(v -> v.getRadioVehicleType().equals(rvt) && v.getRadioVehicleNumber().equals(rvn))
                .findFirst()
                .orElse(null);
        return dto;
    }

    public List<VehicleDTO> receiveVehiclesFromFiredepartment(String sid) {
        Session s = sessionService.auth(sid);
        if (s == null) {
            return null;
        }
        Firedepartment f = s.getFiredepartment();
        List<Vehicle> vehicles = vehicleRepository.findAllByFiredepartment(f);
        List<VehicleDTO> dto = vehicles.stream().map(v -> createVehicleDTO(v)).collect(Collectors.toList());
        return dto;
    }

    private VehicleDTO createVehicleDTO(Vehicle vehicle) {
        VehicleDTO v = new VehicleDTO();
        v.setFid(vehicle.getFiredepartment().getId());
        v.setName(vehicle.getName());
        v.setShortcut(vehicle.getShortcut());
        v.setRadioVehicleType(vehicle.getRadioVehicleType());
        v.setRadioVehicleNumber(vehicle.getRadioVehicleNumber());
        return v;

    }
}
