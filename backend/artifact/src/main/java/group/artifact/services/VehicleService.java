package group.artifact.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import group.artifact.dtos.VehicleDTO;
import group.artifact.dtos.VehicleWithStoragesDTO;
import group.artifact.models.Firedepartment;
import group.artifact.models.Session;
import group.artifact.models.Storage;
import group.artifact.models.Vehicle;
import group.artifact.repositories.FiredepartmentRepository;
import group.artifact.repositories.StorageRepository;
import group.artifact.repositories.VehicleRepository;

@Service
public class VehicleService {

    @Autowired
    SessionService sessionService;
    @Autowired
    VehicleRepository vehicleRepository;
    @Autowired
    FiredepartmentRepository firedepartmentRepository;
    @Autowired
    StorageRepository storageRepository;

    public void save(VehicleWithStoragesDTO vehicleDTO) {
        // extract vehicle from the vehicle dto"
        Vehicle v = new Vehicle();
        VehicleDTO vDTO = vehicleDTO.getVehicle();
        Firedepartment fd = firedepartmentRepository.findById(vDTO.getFid()).orElse(null);
        if (fd == null) {
            System.out
                    .println("ERROR: saving vehicle was not possible, because provided firedepartment can't be found");
            return;
        }

        v.setFiredepartment(fd);
        v.setRadioVehicleType(vDTO.getRadioVehicleType());
        v.setRadioVehicleNumber(vDTO.getRadioVehicleNumber());
        v.setShortcut(vDTO.getShortcut());
        v.setName(vDTO.getName());
        Vehicle newVehicle = vehicleRepository.save(v);

        // extract storages
        Storage[] storages = vehicleDTO.getStorages();
        for (Storage storage : storages) {
            storage.setVehicle(newVehicle);
            storageRepository.save(storage);
        }

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
