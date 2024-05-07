package group.artifact.dtos;

import group.artifact.models.Material;
import group.artifact.models.Storage;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class StorageWithMaterialsDTO {
    private Integer stid; // storage id
    private String stname; // storage name
    private String name;
    private String description;
    private Integer quantity;

    public StorageWithMaterialsDTO(Material material, Storage storage, Integer quantity) {
        setStid(storage.getId());
        setStname(storage.getName());

        setName(material.getName());
        setDescription(material.getDescription());
        setQuantity(quantity == null ? 1 : quantity);
    }
}
