package group.artifact.dtos;

import group.artifact.models.Material;
import lombok.Data;

@Data
public class MaterialDTO {
    private Integer stid; // storage id
    private String name;
    private String description;
    private Integer quantity;

    public MaterialDTO(Material mat, Integer quantity) {
        this.setName(mat.getName());
        this.setDescription(mat.getDescription());
        this.setQuantity(quantity);
    }
}
