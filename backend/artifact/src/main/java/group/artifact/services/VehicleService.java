package group.artifact.services;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import group.artifact.dtos.StorageWithMaterialsDTO;
import group.artifact.dtos.VehicleDTO;
import group.artifact.dtos.VehicleWithStoragesDTO;
import group.artifact.models.Firedepartment;
import group.artifact.models.Session;
import group.artifact.models.Storage;
import group.artifact.models.Vehicle;
import group.artifact.repositories.FiredepartmentRepository;
import group.artifact.repositories.StorageRepository;
import group.artifact.repositories.StoragesWithMaterialsRepository;
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
    @Autowired
    StoragesWithMaterialsRepository storagesWithMaterialsRepository;

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
        VehicleDTO vehicle = vehicles.stream()
                .filter(v -> v.getRadioVehicleType().equals(rvt) && v.getRadioVehicleNumber().equals(rvn))
                .findFirst()
                .orElse(null);
        return vehicle;
    }

    public List<VehicleDTO> receiveVehiclesFromFiredepartment(String sid) {
        List<Vehicle> vehicles = receiveVehiclesFromSid(sid);
        List<VehicleDTO> dtos = vehicles.stream().map(v -> createVehicleDTO(v)).collect(Collectors.toList());
        return dtos;

    }

    public List<StorageWithMaterialsDTO> receiveStoragesFromVehicle(String sid, String rvt, String rvn) {
        // find vehicle
        List<Vehicle> vehicles = receiveVehiclesFromSid(sid);
        Vehicle vehicle = vehicles.stream()
                .filter(v -> v.getRadioVehicleType().equals(rvt) && v.getRadioVehicleNumber().equals(rvn)).findFirst()
                .orElse(null);

        // find corresponding storages
        List<Storage> storages = storageRepository.findByVehicle(vehicle);
        List<StorageWithMaterialsDTO> result = new LinkedList<>();
        // iterate through every storage and get all materials in it
        for (Storage s : storages) {
            // fill storages with material
            List<StorageWithMaterialsDTO> filledStorages = storagesWithMaterialsRepository.findByStorage(s).stream()
                    .map(swm -> new StorageWithMaterialsDTO(swm.getMaterial(), swm.getStorage(), swm.getQuantity())).toList();
            // append created dto to result
            result.addAll(filledStorages);

        }
        return result;
    }

    private VehicleDTO createVehicleDTO(Vehicle vehicle) {
        VehicleDTO v = new VehicleDTO();
        v.setFid(vehicle.getFiredepartment().getId()); // firedepartment id
        v.setVid(vehicle.getId()); // vehicle id
        v.setName(vehicle.getName());
        v.setShortcut(vehicle.getShortcut());
        v.setRadioVehicleType(vehicle.getRadioVehicleType());
        v.setRadioVehicleNumber(vehicle.getRadioVehicleNumber());
        return v;
    }

    private List<Vehicle> receiveVehiclesFromSid(String sid) {
        Session s = sessionService.auth(sid);
        if (s == null) {
            return null;
        }
        Firedepartment f = s.getFiredepartment();
        List<Vehicle> vehicles = vehicleRepository.findAllByFiredepartment(f);
        return vehicles;
    }
}
