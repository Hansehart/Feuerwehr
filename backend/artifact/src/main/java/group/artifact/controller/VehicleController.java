package group.artifact.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import group.artifact.dtos.StorageWithMaterialsDTO;
import group.artifact.dtos.VehicleDTO;
import group.artifact.dtos.VehicleWithStoragesDTO;
import group.artifact.services.VehicleService;

@RestController
@RequestMapping("/api/service")
public class VehicleController {

    @Autowired
    VehicleService vehicleService;

    @GetMapping("/receive/vehicle")
    public ResponseEntity<VehicleDTO> receiveVehicle(@CookieValue(value = "sid") String sid,
            @RequestParam(required = true) String rvt, // radio vehicle type
            @RequestParam(required = true) String rvn) { // radio vehicle number
        try {
            VehicleDTO v = vehicleService.receiveVehicleFromCallSign(sid, rvt, rvn);
            if (v == null) { // no user found for sid
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }
            return ResponseEntity.ok(v);
        } catch (Exception e) {
            System.out.println("ERROR: " + e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/receive/vehicle/storages")
    public ResponseEntity<List<StorageWithMaterialsDTO>> receiveStorages(@CookieValue(value = "sid") String sid,
            @RequestParam(required = true) String rvt, // radio vehicle type
            @RequestParam(required = true) String rvn) // radio vehicle number
    {
        try {
            List<StorageWithMaterialsDTO> storages = vehicleService.receiveStoragesFromVehicle(sid, rvt, rvn);
            if (storages == null) { // no user found for sid
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }
            return ResponseEntity.ok(storages);
        } catch (Exception e) {
            System.out.println("ERROR: " + e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/receive/vehicles")
    public ResponseEntity<List<VehicleDTO>> receiveVehicles(@CookieValue(value = "sid") String sid) {
        try {
            List<VehicleDTO> v = vehicleService.receiveVehiclesFromFiredepartment(sid);
            if (v == null) { // no user found for sid
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }
            return ResponseEntity.ok(v);
        } catch (Exception e) {
            System.out.println("ERROR: " + e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/save/vehicle")
    public ResponseEntity<String> saveVehicle(@RequestBody VehicleWithStoragesDTO v) {
        try {
            vehicleService.save(v);
            return ResponseEntity.ok(
                    "vehicle and its corresponding storages successfully created and assigned to the fire department");
        } catch (Exception e) {
            System.out.println("ERROR: " + e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
