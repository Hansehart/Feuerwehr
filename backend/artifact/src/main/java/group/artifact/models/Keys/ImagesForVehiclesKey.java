package group.artifact.models.Keys;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class ImagesForVehiclesKey implements Serializable{
    @Column(name = "fk_image")
    private Integer fkImage;

    @Column(name = "fk_vehicle")
    private Integer fkVehicle;

    // @Override
    // public int hashCode() {
    //     return 0;
    // }

    // @Override
    // public boolean equals(Object o) {
    //     return false;
    // }
}
