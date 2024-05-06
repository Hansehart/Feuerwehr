package group.artifact.dtos;

import lombok.Data;

@Data
public class MaterialDTO {
    private String name;
    private String description;
    private Integer stid; // storage id
}
