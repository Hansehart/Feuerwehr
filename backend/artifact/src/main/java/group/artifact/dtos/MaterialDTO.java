package group.artifact.dtos;

import lombok.Data;

@Data
public class MaterialDTO {
    private Integer stid; // storage id
    private String name;
    private String description;
    private Integer quantity;
}
