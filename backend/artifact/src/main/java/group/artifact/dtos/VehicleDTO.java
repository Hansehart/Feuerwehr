package group.artifact.dtos;

import lombok.Data;

@Data
public class VehicleDTO {
    // attributes are explained on the example 40-47-01
    private Integer fid; // here as locationNumber is 40 stored
    private String radioVehicleType; // 47
    private String radioVehicleNumber; // 01
    private String shortcut; 
    private String name;
}
