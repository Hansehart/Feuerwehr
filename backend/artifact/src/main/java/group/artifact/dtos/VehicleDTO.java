package group.artifact.dtos;

import group.artifact.models.RadioCallSign;
import lombok.Data;

@Data
public class VehicleDTO {
    // attributes are explained on the example 40-47-01
    private RadioCallSign radioCallSign; // here as location is 40 stored
    private Short radioVehicleType; // 47
    private Short radioVehicleNumber; // 01 
    private String name;
    private String type;
}
