package group.artifact.dtos;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StorageWithMaterialsDTO {
    String storageName;
    List<MaterialDTO> material;
}
