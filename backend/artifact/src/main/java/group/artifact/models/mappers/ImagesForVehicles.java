package group.artifact.models.mappers;

import group.artifact.models.Image;
import group.artifact.models.Vehicle;
import group.artifact.models.keys.ImagesForVehiclesKey;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
    @JoinColumn(name = "fk_image", insertable = false, updatable = false)
    Image image;

    @ManyToOne
    @JoinColumn(name = "fk_vehicle", insertable = false, updatable = false)
    Vehicle vehicle;
}
