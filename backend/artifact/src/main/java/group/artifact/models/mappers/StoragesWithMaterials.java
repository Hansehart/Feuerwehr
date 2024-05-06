package group.artifact.models.mappers;

import group.artifact.models.Material;
import group.artifact.models.Storage;
import group.artifact.models.keys.UsersInFiredepartmentsKey;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "storages_with_materials")
public class StoragesWithMaterials {
    @EmbeddedId
    private UsersInFiredepartmentsKey id = new UsersInFiredepartmentsKey();

    @ManyToOne
    @MapsId("fkStorage")
    @JoinColumn(name = "fk_storage")
    private Storage storage;

    @ManyToOne
    @MapsId("fkMaterial")
    @JoinColumn(name = "fk_material")
    private Material material;

    private Integer quantity;
}
