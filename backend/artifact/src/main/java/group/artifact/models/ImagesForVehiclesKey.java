package group.artifact.models;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
// import jakarta.persistence.Entity;
// import jakarta.persistence.Table;
// import lombok.Data;
// import lombok.NoArgsConstructor;



// @Data
// @Entity
// @NoArgsConstructor
// @Table(name="images_for_vehicles")
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
