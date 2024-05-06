package group.artifact.dtos;

import java.util.List;

import group.artifact.models.Material;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StorageWithMaterialsDTO {
    String storageName;
    List<Material> material;
}
