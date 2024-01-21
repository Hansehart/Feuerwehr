package group.artifact.models.mappers;

import group.artifact.models.Contentpage;
import group.artifact.models.Material;
import group.artifact.models.keys.ContentPagesForMaterialKey;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@Table(name = "contentpages_for_material")
public class ContentPagesForMaterial {
    @EmbeddedId
    ContentPagesForMaterialKey id = new ContentPagesForMaterialKey();

    @ManyToOne
    @MapsId("fkContentpage")
    @JoinColumn(name = "fk_contentpage")
    Contentpage contentpage;

    @ManyToOne
    @MapsId("fkMaterial")
    @JoinColumn(name = "fk_material")
    Material material;
}
