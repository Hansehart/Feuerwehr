package group.artifact.dtos;

import group.artifact.models.RadioCallSign;
import lombok.Data;

@Data
public class VehicleDTO {
    // attributes are explained on the example 40-47-01
    private RadioCallSign radioCallSign; // here as location is 40 stored
    private String radioVehicleType; // 47
    private String radioVehicleNumber; // 01
    private String shortcut; 
    private String name;
}
