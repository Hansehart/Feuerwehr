package group.artifact.models.keys;

import java.io.Serializable;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class StoragesWithMaterialsKey implements Serializable{
    @Column(name = "fk_storage")
    private Integer fkStorage;

    @Column(name = "fk_material")
    private Integer fkMaterial;

    @Override
    public int hashCode() {
        return (int) (fkStorage.hashCode() * fkMaterial.hashCode());
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof StoragesWithMaterialsKey)) {
            return false;
        }
        StoragesWithMaterialsKey other = (StoragesWithMaterialsKey) o;
        boolean equalsForeignKeys = (fkStorage == null && other.fkStorage == null) || (fkStorage != null && this.fkStorage.equals(other.fkStorage))
         || (fkMaterial == null && other.fkMaterial == null) || (fkMaterial != null && this.fkMaterial.equals(other.fkMaterial));
        return equalsForeignKeys;
    }
}
