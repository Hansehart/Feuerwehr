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

import group.artifact.dtos.VehicleDTO;
import group.artifact.models.Vehicle;
import group.artifact.services.VehicleService;

@RestController
@RequestMapping("/api/service")
public class VehicleController {

    @Autowired
    VehicleService vehicleService;

    @GetMapping("/receive/vehicle")
    public ResponseEntity<Vehicle> receiveVehicle(@RequestParam(required = true) Integer cs) { // call sign i. e.
                                                                                               // 40-47-01 (place, type,
                                                                                               // count)
        try {
            Vehicle v = vehicleService.receive(cs);
            return ResponseEntity.ok(v);
        } catch (Exception e) {
            System.out.println("ERROR: " + e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/receive/vehicles")
    public ResponseEntity<List<VehicleDTO>> receiveVehicles(@CookieValue(value = "sid") String sid) {
        try {
            List<VehicleDTO> v = vehicleService.receiveVehiclesFromFiredepartment(sid);
            return ResponseEntity.ok(v);
        } catch (Exception e) {
            System.out.println("ERROR: " + e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/save/vehicle")
    public ResponseEntity<String> saveVehicle(@RequestBody VehicleDTO v) {
        try {
            vehicleService.save(v);
            return ResponseEntity.ok("vehicle and radio call sign successfully created");
        } catch (Exception e) {
            System.out.println("ERROR: " + e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
