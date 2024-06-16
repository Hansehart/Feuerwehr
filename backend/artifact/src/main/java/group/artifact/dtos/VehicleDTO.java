package group.artifact.dtos;

import lombok.Data;

@Data
public class VehicleDTO {
    private Integer fid; // firedepartment id
    private Integer vid; // vehicle id
    // attributes are explained on the example 40-47-01
    private String radioVehicleType; // 47
    private String radioVehicleNumber; // 01
    private String shortcut;
    private String name;

    private String crew;
    private Integer hp;
    private Integer waterCapacity;
}
