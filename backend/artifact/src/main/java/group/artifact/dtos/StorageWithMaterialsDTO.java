package group.artifact.dtos;

import java.util.List;

import group.artifact.models.Material;
import group.artifact.models.Storage;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StorageWithMaterialsDTO {
    Storage storage;
    List<Material> material;
}
