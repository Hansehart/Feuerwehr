package group.artifact.models.keys;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class ImagesForVehiclesKey implements Serializable {
    @Column(name = "fk_image")
    private Integer fkImage;

    @Column(name = "fk_vehicle")
    private Integer fkVehicle;

    @Override
    public int hashCode() {
        return 0;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ImagesForVehiclesKey)) {
            return false;
        }
        ImagesForVehiclesKey other = (ImagesForVehiclesKey) o;
        boolean equalsForeignKeys = (fkImage == null && other.fkImage == null) || (fkImage != null && this.fkImage.equals(other.fkImage))
         || (fkVehicle == null && other.fkVehicle == null) || (fkVehicle != null && this.fkVehicle.equals(other.fkVehicle));
        return equalsForeignKeys;
    }
}
