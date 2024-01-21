package group.artifact.models.mappers;

import group.artifact.models.Material;
import group.artifact.models.StorageLocation;
import group.artifact.models.keys.StorageLocationContainsMaterialKey;
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
@Table(name="storagelocation_contains_material")
public class StorageLocationContainsMaterial {
    @EmbeddedId
    StorageLocationContainsMaterialKey id = new StorageLocationContainsMaterialKey();

    @ManyToOne
    @MapsId("fkStoragelocation")
    @JoinColumn(name = "fk_storagelocation")
    StorageLocation storageLocation;

    @ManyToOne
    @MapsId("fkMaterial")
    @JoinColumn(name = "fk_material")
    Material material;
}
