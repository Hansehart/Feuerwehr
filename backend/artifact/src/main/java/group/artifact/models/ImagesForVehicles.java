package group.artifact.models;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.NoArgsConstructor;
import lombok.Data;

@Data
@Entity
@NoArgsConstructor
@Table(name="images_for_vehicles")
public class ImagesForVehicles {
    @EmbeddedId
    ImagesForVehiclesKey id = new ImagesForVehiclesKey();

    @ManyToOne
    @MapsId("fkImage")
    @JoinColumn(name = "fk_image")
    Image image;

    @ManyToOne
    @MapsId("fkVehicle")
    @JoinColumn(name = "fk_vehicle")
    Vehicle vehicle;
}
