package group.artifact.dtos;

import group.artifact.models.RadioCallSign;
import lombok.Data;

@Data
public class VehicleDTO {
    // attributes are explained on the example 40-47-01
    private Short location; // 40
    private Short radioVehicleType; // 47
    private Short radioVehicleNumber; // 01 
    private String name;
    private String type;
    private RadioCallSign rcs;
}
