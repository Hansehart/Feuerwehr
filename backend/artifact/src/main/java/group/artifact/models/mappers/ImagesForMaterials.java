package group.artifact.models.mappers;

import group.artifact.models.Image;
import group.artifact.models.Material;
import group.artifact.models.keys.ImagesForMaterialsKey;
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
@Table(name="images_for_materials")
public class ImagesForMaterials {
    @EmbeddedId
    ImagesForMaterialsKey id = new ImagesForMaterialsKey();

    @ManyToOne
    @JoinColumn(name = "fk_image", insertable = false, updatable = false)
    Image image;

    @ManyToOne
    @JoinColumn(name = "fk_material", insertable = false, updatable = false)
    Material material;
}
