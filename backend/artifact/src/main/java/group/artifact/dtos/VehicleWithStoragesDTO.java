package group.artifact.dtos;

import group.artifact.models.Storage;
import lombok.Data;

@Data
public class VehicleWithStoragesDTO {
    VehicleDTO vehicle;
    Storage[] storages;
}
