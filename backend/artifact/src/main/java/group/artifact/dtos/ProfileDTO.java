package group.artifact.dtos;

import lombok.Data;

@Data
public class ProfileDTO {
    private String username;
    private String fdName; // firedepartment name
    private String fdLocationNumber; // firedepartment location number
}
