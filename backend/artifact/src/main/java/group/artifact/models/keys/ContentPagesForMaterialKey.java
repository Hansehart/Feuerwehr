package group.artifact.models.keys;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class ContentPagesForMaterialKey implements Serializable {
    @Column(name = "fk_contentpage")
    private Integer fkContentpage;

    @Column(name = "fk_material")
    private Integer fkMaterial;

    @Override
    public int hashCode() {
        return (int) (fkContentpage.hashCode() * fkMaterial.hashCode());
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ContentPagesForMaterialKey)) {
            return false;
        }
        ContentPagesForMaterialKey other = (ContentPagesForMaterialKey) o;
        boolean equalsForeignKeys = (fkContentpage == null && other.fkContentpage == null) || (fkContentpage != null && this.fkContentpage.equals(other.fkContentpage))
         || (fkMaterial == null && other.fkMaterial == null) || (fkMaterial != null && this.fkMaterial.equals(other.fkMaterial));
        return equalsForeignKeys;
    }
}
