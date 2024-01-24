package group.artifact.models.keys;

import java.io.Serializable;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class ImagesForMaterialsKey implements Serializable{
    @Column(name = "fk_image")
    private Integer fkImage;

    @Column(name = "fk_material")
    private Integer fkMaterial;

    @Override
    public int hashCode() {
        return (int) (fkImage.hashCode() * fkMaterial.hashCode());
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ImagesForMaterialsKey)) {
            return false;
        }
        ImagesForMaterialsKey other = (ImagesForMaterialsKey) o;
        boolean equalsForeignKeys = (fkImage == null && other.fkImage == null) || (fkImage != null && this.fkImage.equals(other.fkImage))
         || (fkMaterial == null && other.fkMaterial == null) || (fkMaterial != null && this.fkMaterial.equals(other.fkMaterial));
        return equalsForeignKeys;
    }
}
