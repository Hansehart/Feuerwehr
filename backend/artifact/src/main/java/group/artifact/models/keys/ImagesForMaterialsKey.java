package group.artifact.models.keys;

import java.io.Serializable;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class ImagesForMaterialsKey implements Serializable{
    @Column(name = "fk_image")
    private Integer fkImageM;

    @Column(name = "fk_material")
    private Integer fkMaterialI;

    @Override
    public int hashCode() {
        return (int) (fkImageM.hashCode() * fkMaterialI.hashCode());
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
        boolean equalsForeignKeys = (fkImageM == null && other.fkImageM == null) || (fkImageM != null && this.fkImageM.equals(other.fkImageM))
         || (fkMaterialI == null && other.fkMaterialI == null) || (fkMaterialI != null && this.fkMaterialI.equals(other.fkMaterialI));
        return equalsForeignKeys;
    }
}
