package group.artifact.models.keys;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class StorageLocationContainsMaterialKey implements Serializable {
    @Column(name = "fk_storagelocation")
    private Integer fkStoragelocation;

    @Column(name = "fk_material")
    private Integer fkMaterial;

    @Override
    public int hashCode() {
        return (int) (fkStoragelocation.hashCode() * fkMaterial.hashCode());
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof StorageLocationContainsMaterialKey)) {
            return false;
        }
        StorageLocationContainsMaterialKey other = (StorageLocationContainsMaterialKey) o;
        boolean equalsForeignKeys = (fkStoragelocation == null && other.fkStoragelocation == null) || (fkStoragelocation != null && this.fkStoragelocation.equals(other.fkStoragelocation))
         || (fkMaterial == null && other.fkMaterial == null) || (fkMaterial != null && this.fkMaterial.equals(other.fkMaterial));
        return equalsForeignKeys;
    }
}
